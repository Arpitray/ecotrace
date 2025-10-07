"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plantData, setPlantData] = useState(null);

  useEffect(() => {
    // Get the plant data from URL query params (passed from the main page)
    const dataParam = searchParams.get('data');
    
    if (dataParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(dataParam));
        setPlantData(decoded);
      } catch (error) {
        console.error('Error parsing plant data:', error);
      }
    } else {
      // If no data, redirect to home
      router.push('/');
    }
  }, [searchParams, router]);

  if (!plantData) {
    return (
      <div className="min-h-screen bg-[#EBE8DC] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#6B8E6B] mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const primaryCommonName = plantData.commonNames && plantData.commonNames.length > 0
    ? plantData.commonNames[0]
    : null;

  return (
    <main className="min-h-screen bg-[#EBE8DC] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-light">Back to Home</span>
        </button>

        {/* Header Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl mb-8">
          {/* Success Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Identified with {plantData.score}% confidence
            </div>
          </div>

          {/* Plant Name */}
          <div className="mb-6">
            {primaryCommonName && (
              <h1 className="text-5xl lg:text-6xl font-serif italic text-gray-900 mb-3">
                {primaryCommonName}
              </h1>
            )}
            <h2 className="text-2xl lg:text-3xl font-light text-gray-700 mb-2">
              {plantData.scientificName}
            </h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {plantData.family && (
                <span className="bg-[#C8DDD0] px-4 py-2 rounded-full text-sm text-gray-800">
                  Family: {plantData.family}
                </span>
              )}
              {plantData.genus && (
                <span className="bg-[#E8DDD0] px-4 py-2 rounded-full text-sm text-gray-800">
                  Genus: {plantData.genus}
                </span>
              )}
            </div>
          </div>

          {/* Common Names */}
          {plantData.commonNames && plantData.commonNames.length > 1 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Also known as:</h3>
              <div className="flex flex-wrap gap-2">
                {plantData.commonNames.slice(1).map((name, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Images Grid */}
        {plantData.images && plantData.images.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-serif italic text-gray-900 mb-6">Reference Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {plantData.images.slice(0, 6).map((image, idx) => (
                <div key={idx} className="relative group">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-[#C8DDD0]">
                    <img
                      src={image.url}
                      alt={`${plantData.scientificName} - ${image.organ || 'plant'}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23C8DDD0' width='400' height='400'/%3E%3Ctext x='200' y='200' font-size='100' text-anchor='middle' fill='%23fff'%3E🌿%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  {image.organ && (
                    <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-xs">
                      {image.organ}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Eco Fact Card */}
        <div className="bg-gradient-to-br from-[#6B8E6B] to-[#5A7D5A] rounded-3xl p-8 shadow-xl mb-8 text-white">
          <div className="flex items-start gap-4">
            <div className="text-5xl">🌍</div>
            <div className="flex-1">
              <h3 className="text-2xl font-serif italic mb-3">Environmental Fact</h3>
              <p className="text-lg font-light leading-relaxed">
                {plantData.ecoFact}
              </p>
            </div>
          </div>
        </div>

        {/* Alternative Matches */}
        {plantData.alternativeMatches && plantData.alternativeMatches.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-serif italic text-gray-900 mb-6">
              Other Possible Matches
            </h3>
            <div className="space-y-4">
              {plantData.alternativeMatches.map((match, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{match.scientificName}</p>
                    {match.commonNames && match.commonNames.length > 0 && (
                      <p className="text-sm text-gray-600">{match.commonNames[0]}</p>
                    )}
                  </div>
                  <div className="bg-[#6B8E6B] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {match.score}% match
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex-1 px-8 py-4 bg-[#6B8E6B] hover:bg-[#5A7D5A] text-white rounded-2xl font-light transition-all duration-300 shadow-md hover:shadow-lg text-center"
          >
            Identify Another Plant
          </button>
          <button
            onClick={() => router.push('/browse')}
            className="flex-1 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-2xl font-light transition-all duration-300 shadow-md hover:shadow-lg text-center"
          >
            Browse More Plants
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#EBE8DC] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#6B8E6B] mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
