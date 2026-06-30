import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-ink/10 bg-cream/80 backdrop-blur sticky top-0 z-40">
      <div className="container-wide flex items-center justify-between py-5">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-ink">
          My Blog
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-ink/70 transition-colors hover:text-accent">
            Home
          </Link>
          <Link href="/posts" className="text-ink/70 transition-colors hover:text-accent">
            Posts
          </Link>
          <Link href="/categories" className="text-ink/70 transition-colors hover:text-accent">
            Categories
          </Link>
          <Link href="/authors" className="text-ink/70 transition-colors hover:text-accent">
            Authors
          </Link>
        </nav>
      </div>
    </header>
  )
}