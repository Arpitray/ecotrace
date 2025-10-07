This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Vercel Deployment (project-specific)

This project is ready for Vercel. Recommended steps:

1. Push the repository to your Git provider (GitHub/GitLab/Bitbucket).
2. In Vercel, import the repository and create a project.
3. Add the following environment variables in Vercel Project Settings -> Environment Variables:
	- `PLANTNET_API_KEY` (required) — your PlantNet API key
	- `PLANTNET_BASE_URL` (optional) — default: `https://my-api.plantnet.org/v2`
	- `PERENUAL_API_KEY` (optional but recommended for richer plant data)
	- `PERENUAL_BASE_URL` (optional) — default: `https://perenual.com/api/species-list`

Vercel will run `npm run build` automatically. If you need to set secrets via the Vercel CLI, use `vercel env add <NAME>`.

Notes:
- Keep API keys out of client code; server routes in `app/api/*` read them from `process.env`.
- `.env.local` is intentionally gitignored; do not commit secrets.
