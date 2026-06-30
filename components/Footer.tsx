export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-20 border-t border-ink/10 bg-cream">
      <div className="container-wide flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="font-serif text-lg font-semibold text-ink">My Blog</p>
        <p className="text-sm text-ink/50">© {year} My Blog. All rights reserved.</p>
      </div>
    </footer>
  )
}