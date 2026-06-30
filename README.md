# My Blog

![App Preview](https://imgix.cosmicjs.com/0a735b00-746f-11f1-a87f-d72293b1048a-autopilot-photo-1605100804763-247f67b3557e-1782815569063.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and fully responsive creative portfolio blog built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). It showcases blog posts with featured images, rich content, tags, authors, and categories — all managed dynamically through your Cosmic bucket.

## Features

- 🎨 Elegant, modern, responsive design with Tailwind CSS
- 📝 Blog post listing with featured images, excerpts, and tags
- 👤 Author profiles with bios and profile photos
- 🏷️ Category pages with filtered post listings
- 🔍 Individual post pages with full rich-text content
- ⚡ Server-side rendering for fast performance and SEO
- 📱 Mobile-first, fully accessible layout
- 🖼️ Optimized images via imgix

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a439b07eef00fdac9d0dd43&clone_repository=6a439beceef00fdac9d0dd70)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: Trends change, but certain engagement ring styles remain timeless. Whether you choose a natural diamond or a lab-grown diamond, classic designs continue to define elegance across generations. Today, many couples are selecting lab-grown diamonds for their beauty, value, and ethical appeal — without compromising on brilliance or durability. The best part? Every timeless style looks just as stunning with a lab-created diamond. Let's explore the forever favorites. 1. Solitaire Engagement Rings (Natural or Lab-Grown)... 2. Halo Engagement Rings with Lab-Grown Diamonds... 3. Three-Stone (Trilogy) Engagement Rings... 4. Vintage-Inspired Lab-Grown Diamond Rings... 5. Oval & Elongated Lab-Grown Diamond Rings... 6. Emerald Cut Lab-Grown Diamond Rings... Why Lab-Grown Diamonds Fit Timeless Styles: Chemically and physically identical to natural diamonds, IGI & GIA certified, More budget-friendly, Eco-conscious choice, Visually identical to mined diamonds. The style makes the ring timeless — not whether the diamond was grown underground or in a lab."

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) ([SDK docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account and bucket with `authors`, `categories`, and `posts` object types

### Installation

```bash
bun install
```

Create your environment variables (these are provided automatically when deploying through Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with author and category data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .depth(1)
```

## Cosmic CMS Integration

This app reads three object types from your Cosmic bucket:

- **authors** — `name`, `bio`, `profile_photo`
- **categories** — `name`, `description`
- **posts** — `title`, `excerpt`, `featured_image`, `content`, `author`, `category`, `tags`

Posts connect to authors and categories via object relationship metafields, accessed using the `depth` parameter. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel**: Push to GitHub and import the repo into Vercel. Add the environment variables in the project settings.
- **Netlify**: Connect your repository and configure the build command `bun run build`.

For production, set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's dashboard.

<!-- README_END -->