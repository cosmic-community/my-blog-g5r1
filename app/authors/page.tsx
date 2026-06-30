import Link from 'next/link'
import { getAllAuthors, getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export const metadata = {
  title: 'Authors — My Blog',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="container-wide py-12">
      <header className="mb-10">
        <h1 className="font-serif text-4xl font-bold text-ink">Authors</h1>
        <p className="mt-3 text-ink/60">The voices behind My Blog.</p>
      </header>

      {authors.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink/20 bg-white/50 p-12 text-center">
          <p className="text-ink/50">No authors found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => {
            const photo = author.metadata?.profile_photo
            const name = getMetafieldValue(author.metadata?.name) || author.title
            const bio = getMetafieldValue(author.metadata?.bio)
            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group flex flex-col items-center rounded-xl border border-ink/10 bg-white p-7 text-center transition-shadow hover:shadow-lg"
              >
                {photo ? (
                  <img
                    src={`${photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                    alt={name}
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-accent/10 font-serif text-2xl text-accent">
                    {name.charAt(0)}
                  </div>
                )}
                <h2 className="mt-5 font-serif text-xl font-bold text-ink transition-colors group-hover:text-accent">
                  {name}
                </h2>
                {bio && <p className="mt-2 line-clamp-3 text-sm text-ink/60">{bio}</p>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}