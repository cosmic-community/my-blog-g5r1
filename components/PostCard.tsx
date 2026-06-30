import Link from 'next/link'
import { Post } from '@/types'
import { getMetafieldValue, normalizeTags } from '@/lib/cosmic'
import TagList from '@/components/TagList'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  if (!post) return null

  const featuredImage = post.metadata?.featured_image
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const category = post.metadata?.category
  const author = post.metadata?.author
  const tags = normalizeTags(post.metadata?.tags).slice(0, 3)
  const title = getMetafieldValue(post.metadata?.title) || post.title

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-white transition-shadow hover:shadow-lg">
      <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={250}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-56 w-full items-center justify-center bg-accent/10 text-accent">
            <span className="font-serif text-xl">My Blog</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent transition-colors hover:text-accent-dark"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="font-serif text-xl font-bold leading-tight text-ink transition-colors group-hover:text-accent">
            {title}
          </h3>
        </Link>
        {excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">{excerpt}</p>
        )}
        <div className="mt-auto pt-5">
          <TagList tags={tags} />
          {author && (
            <p className="mt-4 text-sm text-ink/50">
              By{' '}
              <Link
                href={`/authors/${author.slug}`}
                className="font-medium text-ink/70 transition-colors hover:text-accent"
              >
                {getMetafieldValue(author.metadata?.name) || author.title}
              </Link>
            </p>
          )}
        </div>
      </div>
    </article>
  )
}