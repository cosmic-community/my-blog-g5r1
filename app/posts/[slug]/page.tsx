// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getMetafieldValue, normalizeTags } from '@/lib/cosmic'
import TagList from '@/components/TagList'

export const revalidate = 60

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const content = getMetafieldValue(post.metadata?.content)
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const category = post.metadata?.category
  const author = post.metadata?.author
  const tags = normalizeTags(post.metadata?.tags)
  const title = getMetafieldValue(post.metadata?.title) || post.title

  return (
    <article className="pb-16">
      <div className="container-wide pt-10">
        <div className="mx-auto max-w-3xl text-center">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          {excerpt && <p className="mt-5 text-lg text-ink/60">{excerpt}</p>}
          {author && (
            <p className="mt-6 text-sm text-ink/50">
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

      {featuredImage && (
        <div className="container-wide mt-10">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl">
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="container-wide mt-12">
        <div className="mx-auto max-w-3xl">
          {content ? (
            <div
              className="prose prose-lg prose-headings:font-serif prose-headings:text-ink prose-a:text-accent max-w-none text-ink/80"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="text-ink/60">No content available.</p>
          )}

          {tags.length > 0 && (
            <div className="mt-12 border-t border-ink/10 pt-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink/50">
                Tags
              </h3>
              <TagList tags={tags} />
            </div>
          )}

          <div className="mt-12">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-dark"
            >
              <span aria-hidden>←</span> Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}