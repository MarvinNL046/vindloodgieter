import Link from 'next/link'
import { Search, Home, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Pagina Niet Gevonden</h2>
        <p className="text-lg text-muted-foreground mb-8">
          De pagina die u zoekt bestaat niet of is verplaatst.
          Geen zorgen, wij helpen u verder!
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          <Link href="/">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Homepage
            </Button>
          </Link>
          <Link href="/search">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-4 w-4" />
              Zoek Loodgieter
            </Button>
          </Link>
          <Link href="/provincie/noord-holland">
            <Button variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" />
              Per Provincie
            </Button>
          </Link>
        </div>

        <div className="bg-muted rounded-lg p-6">
          <h3 className="font-semibold mb-3">Populaire Locaties</h3>
          <div className="grid gap-2 text-sm">
            <Link href="/provincie/noord-holland" className="text-blue-600 hover:underline">
              Loodgieters in Noord-Holland
            </Link>
            <Link href="/provincie/zuid-holland" className="text-blue-600 hover:underline">
              Loodgieters in Zuid-Holland
            </Link>
            <Link href="/provincie/noord-brabant" className="text-blue-600 hover:underline">
              Loodgieters in Noord-Brabant
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Gevonden een verkeerde link? Laat het ons weten via</p>
          <a href="mailto:info@vindloodgieter.nl" className="text-blue-600 hover:underline">
            info@vindloodgieter.nl
          </a>
        </div>
      </div>
    </div>
  )
}
