# StatPad Web

Welcome to the StatPad web application! This repository contains the source code for the landing page and basic forms for the upcoming StatPad platform. The goal of this branch is to provide a marketing site with waitlist and contact forms while leaving a clean upgrade path for future functionality.

## 🏗 Project structure

This project uses **Next.js** with the **app router**, **TypeScript**, **Tailwind CSS**, and a handful of small utilities. The key folders and files include:

- `app/` – Next.js routes using the app router. The `(marketing)` folder contains the landing page, while `privacy` and `terms` are simple placeholder pages. Server actions live in `app/actions` and backend utilities live under `app/api/_utils`.
- `components/` – Reusable React components used throughout the site. These include the hero section, feature cards, carousel, stats strip, forms, FAQ and footer. Basic UI primitives (button, input, textarea, card, etc.) live under `components/ui` and are styled with Tailwind classes.
- `public/` – Static assets such as the temporary logo and mobile screenshots. The screenshots shown in the carousel live in `public/screenshots` and can be replaced by dropping new images into that folder.
- `data/` – A directory reserved for local data storage. When no Supabase keys are configured, form submissions will be appended to `data/submissions.json` and logged to the console. A `.gitkeep` file ensures this folder exists when the repository is first cloned.
- `.env.example` – A template for environment variables used by Supabase and Resend. Copy this file to `.env.local` and fill in your keys to enable database and email functionality.

## 🚀 Quick start

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Prepare environment variables:**

   Create a `.env.local` file at the root of the project and add the following variables (replace values where appropriate):

   ```dotenv
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
   RESEND_API_KEY=your-resend-api-key
   ```

   If the Supabase keys are omitted, form submissions will be stored locally in `data/submissions.json` and emails will be mocked (logged to the console). Once keys are provided, the `app/api/_utils/store.ts` and `app/api/_utils/email.ts` helpers will automatically switch to using Supabase and Resend.

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. You should see the landing page with a hero section, feature cards, screenshots carousel, stats strip, waitlist form, contact form, FAQ and footer.

## 📦 Adding screenshots

The carousel on the landing page pulls its images from `public/screenshots`. To swap the mobile screenshots for your own:

1. Place up to three images in `public/screenshots` and name them `screen1.png`, `screen2.png`, `screen3.png`. Supported formats include `.png` and `.jpg`.
2. Restart the development server if it’s running. The carousel will automatically pick up the new images.

## 📧 Email & database integration

Two helper modules live under `app/api/_utils`:

- **store.ts** – Handles storing submissions. If `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are defined, entries will be inserted into the `waitlist` and `contact_messages` tables in your Supabase project. Otherwise, submissions will be appended to `data/submissions.json`.
- **email.ts** – Sends emails via the Resend API. If `RESEND_API_KEY` is set, the waitlist confirmation and contact notification emails will be sent. Otherwise, email payloads will be logged to the console.

These utilities make it easy to enable real backend behaviour without changing any of the form or action code. For local development or staging, you can safely omit the keys and review data in the `data/` directory.

## 🛣️ Future roadmap (v2)

The current implementation is focused on the marketing site. Future improvements planned for version 2 include:

- Adding authentication with NextAuth and Supabase Auth.
- Building an authenticated dashboard for browsing games, posting clips and viewing stats.
- Using Contentlayer or MDX for editable marketing copy and blog posts.
- Enhancing the screenshot carousel with interactive device frames and auto‑play animations.

Contributions and feedback are welcome! Feel free to open issues or pull requests to help shape the future of StatPad.