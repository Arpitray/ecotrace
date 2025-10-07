// Curated plant database for common houseplants and garden plants
// Used as fallback when Trefle API is unavailable
export const PLANT_DATABASE = {
  // Common houseplants
  "Epipremnum aureum": {
    foundIn: "Native to Mo'orea in French Polynesia; widely cultivated in tropical and subtropical regions worldwide",
    edibility: "No — Toxic if ingested",
    medicinal: "Not used medicinally; contains calcium oxalate crystals which are toxic",
    toxicity: "Toxic to humans and pets (cats, dogs). Causes oral irritation, drooling, and difficulty swallowing",
    usage: "Indoor/Outdoor (commonly used as indoor houseplant)",
    airPurifying: "Yes — known to remove formaldehyde and other VOCs",
    image: "https://example.com/epipremnum.jpg"
  },
  "Monstera deliciosa": {
    foundIn: "Native to tropical rainforests of southern Mexico to Panama",
    edibility: "Yes — Ripe fruit is edible; unripe fruit is toxic",
    medicinal: "Traditionally used for arthritis and snake bites (not scientifically validated)",
    toxicity: "Unripe fruit and leaves contain calcium oxalate crystals; toxic to pets",
    usage: "Indoor/Outdoor",
    airPurifying: "Yes — commonly used indoors for moderate air cleaning",
    image: "https://example.com/monstera.jpg"
  },
  "Spathiphyllum wallisii": {
    foundIn: "Native to tropical regions of Colombia and Venezuela",
    edibility: "No — Toxic if ingested",
    medicinal: "Used in NASA studies for air purification",
    toxicity: "Toxic to pets and humans; contains calcium oxalate crystals",
    usage: "Indoor",
    airPurifying: "Yes — frequently cited in NASA studies",
    image: "https://example.com/spathiphyllum.jpg"
  },
  "Sansevieria trifasciata": {
    foundIn: "Native to West Africa from Nigeria to the Congo",
    edibility: "No — Can cause nausea if ingested",
    medicinal: "Used traditionally for treating ear infections and wounds; contains saponins",
    toxicity: "Mildly toxic to pets",
    usage: "Indoor",
    airPurifying: "Yes — helps reduce indoor VOCs",
    image: "https://example.com/sansevieria.jpg"
  },
  "Ficus elastica": {
    foundIn: "Native to northeast India, Nepal, Bhutan, Myanmar, China, Malaysia, and Indonesia",
    edibility: "No — Not edible",
    medicinal: "Latex traditionally used for warts and skin conditions",
    toxicity: "Mildly toxic; sap can cause skin irritation",
    usage: "Indoor/Outdoor",
    airPurifying: "Yes — removes airborne toxins",
    image: "https://example.com/ficus.jpg"
  },
  "Maranta leuconeura": {
    foundIn: "Native to Brazilian tropical forests",
    edibility: "No — Not typically consumed",
    medicinal: "No significant medicinal uses",
    toxicity: "Non-toxic to humans and pets",
    usage: "Indoor",
    airPurifying: "No",
    image: "https://example.com/maranta.jpg"
  },
  "Chlorophytum comosum": {
    foundIn: "Native to tropical and southern Africa",
    edibility: "No — Not typically eaten, though not toxic",
    medicinal: "Used in traditional African medicine for burns and fractures",
    toxicity: "Non-toxic to humans and pets",
    usage: "Indoor",
    airPurifying: "Yes — excellent at removing formaldehyde and xylene",
    image: "https://example.com/chlorophytum.jpg"
  },
  "Aloe vera": {
    foundIn: "Native to Arabian Peninsula; now cultivated worldwide",
    edibility: "Yes — Gel is edible; latex should be avoided",
    medicinal: "Extensively used for burns, wound healing, skin conditions, and digestive support",
    toxicity: "Generally safe; aloe latex can cause cramping if overconsumed",
    usage: "Indoor/Outdoor",
    airPurifying: "Yes — improves indoor air slightly",
    image: "https://example.com/aloe.jpg"
  },
  "Lavandula angustifolia": {
    foundIn: "Native to Mediterranean region",
    edibility: "Yes — Flowers used in teas, baking, seasoning",
    medicinal: "Used for anxiety, insomnia, pain relief, and skin conditions",
    toxicity: "Generally safe; high doses may cause drowsiness",
    usage: "Outdoor/Indoor in pots",
    airPurifying: "No — primarily aromatic",
    image: "https://example.com/lavender.jpg"
  },
  "Rosa chinensis": {
    foundIn: "Native to southwest China; cultivated worldwide",
    edibility: "Yes — Petals edible; rose hips rich in vitamin C",
    medicinal: "Rose water/oil used for skin care, digestive issues",
    toxicity: "Non-toxic",
    usage: "Outdoor",
    airPurifying: "No",
    image: "https://example.com/rose.jpg"
  },
  "Dieffenbachia seguine": {
    foundIn: "Native to Central and South America",
    edibility: "No — Highly toxic if ingested",
    medicinal: "Not used due to high toxicity",
    toxicity: "Highly toxic; causes severe oral pain, swelling",
    usage: "Indoor",
    airPurifying: "No",
    image: "https://example.com/dieffenbachia.jpg"
  },
  "Withania somnifera": {
    foundIn: "Native to India, Middle East, parts of Africa",
    edibility: "No — Processed for medicinal use",
    medicinal: "Important Ayurvedic herb (Ashwagandha) for stress, immunity",
    toxicity: "Safe in recommended doses; high doses may cause stomach upset",
    usage: "Outdoor/Herb",
    airPurifying: "No",
    image: "https://example.com/ashwagandha.jpg"
  },
  "Ocimum tenuiflorum": {
    foundIn: "Native to Indian subcontinent; cultivated throughout Southeast Asia",
    edibility: "Yes — Leaves used in cooking and teas",
    medicinal: "Used for respiratory infections, fever, stress; contains eugenol",
    toxicity: "Generally safe",
    usage: "Outdoor/Herb",
    airPurifying: "No — aromatic",
    image: "https://example.com/tulsi.jpg"
  },
  "Philodendron hederaceum": {
    foundIn: "Native to Central America and the Caribbean",
    edibility: "No — Toxic if ingested",
    medicinal: "Not used medicinally",
    toxicity: "Toxic to humans and pets; contains calcium oxalate crystals",
    usage: "Indoor",
    airPurifying: "Yes",
    image: "https://example.com/philodendron.jpg"
  },
  "Aglaonema commutatum": {
    foundIn: "Native to tropical/subtropical Asia",
    edibility: "No — Toxic if ingested",
    medicinal: "Not used medicinally",
    toxicity: "Toxic to humans and pets",
    usage: "Indoor",
    airPurifying: "Yes",
    image: "https://example.com/aglaonema.jpg"
  },
  "Zamioculcas zamiifolia": {
    foundIn: "Native to eastern Africa",
    edibility: "No — All parts toxic",
    medicinal: "Used traditionally in Tanzania in small doses",
    toxicity: "Toxic to humans and pets; causes irritation",
    usage: "Indoor",
    airPurifying: "No",
    image: "https://example.com/zamioculcas.jpg"
  },
  "Dracaena fragrans": {
    foundIn: "Native to tropical Africa",
    edibility: "No — Not edible",
    medicinal: "No significant uses",
    toxicity: "Toxic to pets; contains saponins",
    usage: "Indoor",
    airPurifying: "Yes",
    image: "https://example.com/dracaena.jpg"
  },
  "Pilea peperomioides": {
    foundIn: "Native to Yunnan Province, China",
    edibility: "No",
    medicinal: "No documented medicinal uses",
    toxicity: "Non-toxic to humans and pets",
    usage: "Indoor",
    airPurifying: "No",
    image: "https://example.com/pilea.jpg"
  },
  "Calathea orbifolia": {
    foundIn: "Native to Bolivia",
    edibility: "No",
    medicinal: "No documented medicinal uses",
    toxicity: "Non-toxic",
    usage: "Indoor",
    airPurifying: "No",
    image: "https://example.com/calathea.jpg"
  },
  "Anthurium andraeanum": {
    foundIn: "Native to Colombia and Ecuador",
    edibility: "No — Toxic if ingested",
    medicinal: "Not used medicinally",
    toxicity: "Toxic to humans and pets; calcium oxalate crystals",
    usage: "Indoor/Outdoor",
    airPurifying: "Yes",
    image: "https://example.com/anthurium.jpg"
  },
  "Begonia maculata": {
    foundIn: "Native to Brazil",
    edibility: "No",
    medicinal: "Some species used for wound healing",
    toxicity: "Mildly toxic to pets; causes oral irritation",
    usage: "Indoor/Outdoor",
    airPurifying: "No",
    image: "https://example.com/begonia.jpg"
  },
  "Solanum melongena": {
    foundIn: "Native to India and Southeast Asia; cultivated worldwide",
    edibility: "Yes — Fruit widely consumed as vegetable (eggplant/aubergine)",
    medicinal: "Used in traditional medicine; contains antioxidants",
    toxicity: "Raw contains solanine; cooking eliminates risk",
    usage: "Outdoor/Vegetable garden",
    airPurifying: "No",
    image: "https://example.com/eggplant.jpg"
  },
  "Ocimum basilicum": {
    foundIn: "Native to tropical regions from central Africa to Southeast Asia",
    edibility: "Yes — Widely used culinary herb",
    medicinal: "Used for digestion, inflammation, respiratory conditions",
    toxicity: "Generally safe; excessive use may cause issues",
    usage: "Outdoor/Indoor herb garden",
    airPurifying: "No",
    image: "https://example.com/basil.jpg"
  },
  "Mentha": {
    foundIn: "Native to temperate regions worldwide",
    edibility: "Yes — Widely used in cooking, teas, and confections",
    medicinal: "Used for digestive issues, headaches, respiratory problems",
    toxicity: "Generally safe; large amounts of mint oil can be toxic",
    usage: "Outdoor/Indoor herb garden",
    airPurifying: "No",
    image: "https://example.com/mentha.jpg"
  },
  "Rosmarinus officinalis": {
    foundIn: "Native to the Mediterranean region",
    edibility: "Yes — Culinary herb used in cooking, teas, and seasoning",
    medicinal: "Used for digestion, circulation, and memory enhancement; contains antioxidants",
    toxicity: "Generally safe; excessive intake may cause digestive upset",
    usage: "Outdoor/Indoor herb garden",
    airPurifying: "No",
    image: "https://example.com/rosemary.jpg"
  },
  "Thymus vulgaris": {
    foundIn: "Native to southern Europe",
    edibility: "Yes — Widely used in cooking, teas, and seasoning",
    medicinal: "Used for respiratory infections, antiseptic properties; contains thymol",
    toxicity: "Safe in culinary amounts; high doses may cause irritation",
    usage: "Outdoor/Indoor herb garden",
    airPurifying: "No",
    image: "https://example.com/thyme.jpg"
  },
  "Ocimum gratissimum": {
    foundIn: "Native to tropical Africa and Asia",
    edibility: "Yes — Leaves used in cooking and teas",
    medicinal: "Used traditionally for respiratory and digestive issues",
    toxicity: "Generally safe",
    usage: "Outdoor/Herb garden",
    airPurifying: "No",
    image: "https://example.com/ocimumgratissimum.jpg"
  },
  "Capsicum annuum": {
    foundIn: "Native to Central and South America",
    edibility: "Yes — Chili peppers and bell peppers consumed worldwide",
    medicinal: "Contains capsaicin; used for pain relief, digestion",
    toxicity: "Safe; very spicy varieties may irritate skin and mouth",
    usage: "Outdoor/Vegetable garden",
    airPurifying: "No",
    image: "https://example.com/capsicum.jpg"
  },
  "Cucumis sativus": {
    foundIn: "Native to India",
    edibility: "Yes — Cucumbers eaten raw or cooked",
    medicinal: "Used for hydration, skin health; mild diuretic",
    toxicity: "Safe",
    usage: "Outdoor/Vegetable garden",
    airPurifying: "No",
    image: "https://example.com/cucumber.jpg"
  },
  "Citrus limon": {
    foundIn: "Native to Asia",
    edibility: "Yes — Fruit widely consumed; zest and juice used in cooking",
    medicinal: "Used for vitamin C, digestion, and immune support",
    toxicity: "Safe; essential oils may irritate skin in concentrated form",
    usage: "Outdoor/Indoor container",
    airPurifying: "No",
    image: "https://example.com/lemon.jpg"
  },
  "Citrus sinensis": {
    foundIn: "Native to Southeast Asia",
    edibility: "Yes — Oranges widely eaten",
    medicinal: "Rich in vitamin C; supports immunity and digestion",
    toxicity: "Safe",
    usage: "Outdoor/Indoor container",
    airPurifying: "No",
    image: "https://example.com/orange.jpg"
  },
  "Fragaria × ananassa": {
    foundIn: "Hybrid, widely cultivated worldwide",
    edibility: "Yes — Strawberries eaten fresh, in desserts, jams",
    medicinal: "Rich in vitamin C and antioxidants; may improve cardiovascular health",
    toxicity: "Safe",
    usage: "Outdoor/Indoor container",
    airPurifying: "No",
    image: "https://example.com/strawberry.jpg"
  },
  "Solanum lycopersicum": {
    foundIn: "Native to western South America; cultivated worldwide",
    edibility: "Yes — Tomatoes eaten raw or cooked",
    medicinal: "Contains lycopene; supports heart health and antioxidants",
    toxicity: "Raw green parts contain solanine; ripe fruit safe",
    usage: "Outdoor/Indoor container",
    airPurifying: "No",
    image: "https://example.com/tomato.jpg"
  },
  "Allium sativum": {
    foundIn: "Native to Central Asia",
    edibility: "Yes — Garlic widely used in cooking",
    medicinal: "Antimicrobial, cardiovascular benefits, immune support",
    toxicity: "Safe in culinary amounts; large doses may cause digestive upset",
    usage: "Outdoor/Indoor herb garden",
    airPurifying: "No",
    image: "https://example.com/garlic.jpg"
  },
  "Allium cepa": {
    foundIn: "Native to Central Asia",
    edibility: "Yes — Onion used worldwide",
    medicinal: "Antioxidant, antimicrobial, supports heart health",
    toxicity: "Safe; can be toxic to pets in large amounts",
    usage: "Outdoor/Indoor herb garden",
    airPurifying: "No",
    image: "https://example.com/onion.jpg"
  },
  "Capsicum frutescens": {
    foundIn: "Native to Central and South America",
    edibility: "Yes — Chili peppers consumed worldwide",
    medicinal: "Capsaicin content; pain relief, metabolism boost",
    toxicity: "Safe; very spicy varieties may irritate skin/mouth",
    usage: "Outdoor/Vegetable garden",
    airPurifying: "No",
    image: "https://example.com/chili.jpg"
  },
  "Mentha spicata": {
    foundIn: "Native to Europe and Asia",
    edibility: "Yes — Culinary and tea use",
    medicinal: "Digestive aid, headache relief, cooling effect",
    toxicity: "Safe; mint oil in high doses may be toxic",
    usage: "Outdoor/Indoor herb garden",
    airPurifying: "No",
    image: "https://example.com/spearmint.jpg"
  },
  "Mentha piperita": {
    foundIn: "Hybrid native to Europe",
    edibility: "Yes — Culinary, tea, confections",
    medicinal: "Digestive aid, respiratory relief; menthol content",
    toxicity: "Safe; excessive oil may be toxic",
    usage: "Outdoor/Indoor herb garden",
    airPurifying: "No",
    image: "https://example.com/peppermint.jpg"
  },
  "Ocimum basilicum 'Genovese'": {
    foundIn: "Native to tropical regions from Africa to Asia",
    edibility: "Yes — Culinary herb for pesto, seasoning",
    medicinal: "Digestive support, anti-inflammatory properties",
    toxicity: "Safe in culinary amounts",
    usage: "Outdoor/Indoor herb garden",
    airPurifying: "No",
    image: "https://example.com/genovesebasil.jpg"
  },
  "Lavandula stoechas": {
    foundIn: "Native to Mediterranean region",
    edibility: "Yes — Used in teas and flavoring",
    medicinal: "Calming, anxiety relief, aromatic uses",
    toxicity: "Generally safe; high doses may cause drowsiness",
    usage: "Outdoor/Indoor container",
    airPurifying: "No",
    image: "https://example.com/frenchlavender.jpg"
  },
  "Pelargonium graveolens": {
    foundIn: "Native to South Africa",
    edibility: "Yes — Leaves used in flavoring and teas",
    medicinal: "Aromatic; may support skin health and relaxation",
    toxicity: "Safe; essential oils in high doses may irritate skin",
    usage: "Outdoor/Indoor container",
    airPurifying: "No",
    image: "https://example.com/geranium.jpg"
  },
  "Hibiscus rosa-sinensis": {
    foundIn: "Native to East Asia",
    edibility: "Yes — Flowers used in teas and beverages",
    medicinal: "Supports blood pressure regulation, antioxidant properties",
    toxicity: "Safe in culinary use",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/hibiscus.jpg"
  },
  "Lavandula dentata": {
    foundIn: "Native to Mediterranean region",
    edibility: "Yes — Floral use in teas",
    medicinal: "Calming, digestive aid",
    toxicity: "Safe; high doses may cause drowsiness",
    usage: "Outdoor garden/Indoor pot",
    airPurifying: "No",
    image: "https://example.com/fringedlavender.jpg"
  },
  "Acer palmatum": {
    foundIn: "Native to Japan, Korea, China",
    edibility: "No",
    medicinal: "No significant medicinal use",
    toxicity: "Non-toxic",
    usage: "Outdoor ornamental",
    airPurifying: "No",
    image: "https://example.com/japanesemaple.jpg"
  },
  "Ficus benjamina": {
    foundIn: "Native to Southeast Asia and Australia",
    edibility: "No",
    medicinal: "Latex used in folk remedies",
    toxicity: "Mildly toxic to pets",
    usage: "Indoor/Outdoor ornamental",
    airPurifying: "Yes",
    image: "https://example.com/ficusbenjamina.jpg"
  },
  "Ailanthus altissima": {
    foundIn: "Native to China",
    edibility: "No",
    medicinal: "Limited use in traditional Chinese medicine",
    toxicity: "Generally safe",
    usage: "Outdoor tree",
    airPurifying: "No",
    image: "https://example.com/treeoftheheaven.jpg"
  },
  "Betula pendula": {
    foundIn: "Native to Europe and parts of Asia",
    edibility: "No",
    medicinal: "Sap used as diuretic and tonic",
    toxicity: "Safe",
    usage: "Outdoor tree",
    airPurifying: "No",
    image: "https://example.com/birch.jpg"
  },
  "Quercus robur": {
    foundIn: "Native to Europe",
    edibility: "Acorns edible when processed",
    medicinal: "Bark used traditionally for astringent purposes",
    toxicity: "Raw acorns toxic due to tannins",
    usage: "Outdoor tree",
    airPurifying: "No",
    image: "https://example.com/oak.jpg"
  },
  "Coffea arabica": {
    foundIn: "Native to Ethiopia",
    edibility: "Yes — coffee beans",
    medicinal: "Caffeine stimulant; improves alertness",
    toxicity: "Excessive caffeine can be toxic",
    usage: "Indoor/Outdoor cultivation",
    airPurifying: "No",
    image: "https://example.com/coffee.jpg"
  },
  "Camellia sinensis": {
    foundIn: "Native to China and India",
    edibility: "Yes — leaves used for tea",
    medicinal: "Antioxidants; supports heart health and metabolism",
    toxicity: "Safe; caffeine in high amounts may cause insomnia",
    usage: "Outdoor/Indoor container",
    airPurifying: "No",
    image: "https://example.com/tea.jpg"
  },
  "Helianthus annuus": {
    foundIn: "Native to North America",
    edibility: "Yes — seeds eaten; oil extracted",
    medicinal: "Sunflower oil for skin and heart health",
    toxicity: "Safe",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/sunflower.jpg"
  },
  "Zea mays": {
    foundIn: "Native to Central America",
    edibility: "Yes — Corn widely consumed",
    medicinal: "Corn silk used as diuretic",
    toxicity: "Safe",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/corn.jpg"
  },
  "Brassica oleracea var. capitata": {
    foundIn: "Native to Europe",
    edibility: "Yes — Cabbage consumed worldwide",
    medicinal: "Rich in vitamins; supports digestion and immunity",
    toxicity: "Safe",
    usage: "Outdoor vegetable garden",
    airPurifying: "No",
    image: "https://example.com/cabbage.jpg"
  },
  "Brassica oleracea var. botrytis": {
    foundIn: "Native to Europe",
    edibility: "Yes — Cauliflower",
    medicinal: "Rich in vitamins and antioxidants",
    toxicity: "Safe",
    usage: "Outdoor vegetable garden",
    airPurifying: "No",
    image: "https://example.com/cauliflower.jpg"
  },
  "Brassica oleracea var. italica": {
    foundIn: "Native to Europe",
    edibility: "Yes — Broccoli",
    medicinal: "Supports immunity; contains antioxidants",
    toxicity: "Safe",
    usage: "Outdoor vegetable garden",
    airPurifying: "No",
    image: "https://example.com/broccoli.jpg"
  },
  "Citrullus lanatus": {
    foundIn: "Native to Africa",
    edibility: "Yes — Watermelon fruit",
    medicinal: "Hydrating; contains antioxidants and vitamins",
    toxicity: "Safe",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/watermelon.jpg"
  },
  "Cucurbita pepo": {
    foundIn: "Native to North America",
    edibility: "Yes — Pumpkin, zucchini, squash",
    medicinal: "Rich in vitamins; supports digestion and skin health",
    toxicity: "Safe",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/pumpkin.jpg"
  },
  "Prunus persica": {
    foundIn: "Native to China",
    edibility: "Yes — Peaches",
    medicinal: "Rich in vitamins and antioxidants",
    toxicity: "Seeds contain cyanogenic compounds; avoid ingestion",
    usage: "Outdoor tree",
    airPurifying: "No",
    image: "https://example.com/peach.jpg"
  },
  "Prunus domestica": {
    foundIn: "Native to Europe and Asia",
    edibility: "Yes — Plums",
    medicinal: "Supports digestion; rich in antioxidants",
    toxicity: "Safe",
    usage: "Outdoor tree",
    airPurifying: "No",
    image: "https://example.com/plum.jpg"
  },
  "Malus domestica": {
    foundIn: "Native to Central Asia",
    edibility: "Yes — Apples",
    medicinal: "Rich in antioxidants and vitamins; supports heart health",
    toxicity: "Seeds contain cyanogenic compounds; avoid large amounts",
    usage: "Outdoor tree",
    airPurifying: "No",
    image: "https://example.com/apple.jpg"
  },
  "Pyrus communis": {
    foundIn: "Native to Europe and Asia",
    edibility: "Yes — Pears",
    medicinal: "High in fiber; supports digestion",
    toxicity: "Safe",
    usage: "Outdoor tree",
    airPurifying: "No",
    image: "https://example.com/pear.jpg"
  },
  "Fragaria vesca": {
    foundIn: "Native to Europe, Asia, and North America",
    edibility: "Yes — Wild strawberries",
    medicinal: "Rich in vitamin C and antioxidants",
    toxicity: "Safe",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/wildstrawberry.jpg"
  },
  "Ribes nigrum": {
    foundIn: "Native to Europe and Asia",
    edibility: "Yes — Blackcurrant berries",
    medicinal: "High in vitamin C; supports immunity",
    toxicity: "Safe",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/blackcurrant.jpg"
  },
  "Vaccinium corymbosum": {
    foundIn: "Native to North America",
    edibility: "Yes — Blueberries",
    medicinal: "Rich in antioxidants; supports brain health",
    toxicity: "Safe",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/blueberry.jpg"
  },
  "Rubus idaeus": {
    foundIn: "Native to Europe and Asia",
    edibility: "Yes — Raspberries",
    medicinal: "Rich in antioxidants and vitamins",
    toxicity: "Safe",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/raspberry.jpg"
  },
  "Rubus fruticosus": {
    foundIn: "Native to Europe",
    edibility: "Yes — Blackberries",
    medicinal: "Rich in antioxidants and fiber",
    toxicity: "Safe",
    usage: "Outdoor garden",
    airPurifying: "No",
    image: "https://example.com/blackberry.jpg"
  }
  // Continue adding plants up to 100 entries in the same format
};


// Function to search the database
export function searchPlantDatabase(scientificName) {
  if (!scientificName) return null;
  
  // Try exact match first
  if (PLANT_DATABASE[scientificName]) {
    return PLANT_DATABASE[scientificName];
  }
  
  // Try partial match (genus + species without author)
  const normalized = scientificName.replace(/\(.*?\)/g, '').trim().split(/\s+/).slice(0, 2).join(' ');
  if (PLANT_DATABASE[normalized]) {
    return PLANT_DATABASE[normalized];
  }
  
  // Try case-insensitive match
  const lowerName = scientificName.toLowerCase();
  for (const [key, value] of Object.entries(PLANT_DATABASE)) {
    if (key.toLowerCase() === lowerName || key.toLowerCase().startsWith(lowerName.split(' ')[0])) {
      return value;
    }
  }
  
  return null;
}
