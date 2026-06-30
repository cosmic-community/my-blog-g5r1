import Link from 'next/link'
import { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface HeroProps {
  post: Post
}

export default function Hero({ post }: HeroProps) {
  if (!post) return null

  const featuredImage = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const category = post.metadata?.category
  const title = getMetafieldValue(post.metadata?.title) || post.title

  return (
    <section className="container-wide pt-12 pb-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {excerpt && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/60">{excerpt}</p>
          )}
          <Link
            href={`/posts/${post.slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Read Article
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
              alt={title}
              width={600}
              height={450}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-80 w-full items-center justify-center bg-accent/10 text-accent">
              <span className="font-serif text-2xl">My Blog</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}