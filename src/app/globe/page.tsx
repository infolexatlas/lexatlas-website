import ResponsiveGlobe from '@/components/ui/ResponsiveGlobe'

export default function GlobePage() {
  return (
    <main>
      <section className="relative w-full">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
          <h2 className="mb-6 text-2xl md:text-3xl font-semibold text-white">Our global coverage</h2>
          <ResponsiveGlobe />
        </div>
      </section>
    </main>
  )
}
