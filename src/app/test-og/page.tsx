import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Test Open Graph - LexAtlas',
  description: 'Page de test pour voir l\'aperçu Open Graph',
}

export default function TestOGPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Aperçu Open Graph</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">Image qui apparaîtra sur les réseaux sociaux :</h2>
          
          {/* Aperçu de l'image Open Graph */}
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-6">
            <img 
              src="/og/home.png" 
              alt="Aperçu Open Graph LexAtlas"
              className="w-full h-auto"
              style={{ maxWidth: '600px', height: 'auto' }}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Détails de l'image :</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Dimensions : 1200 x 630 pixels</li>
                <li>• Format : PNG</li>
                <li>• Taille : ~85 KB</li>
                <li>• Optimisée pour les réseaux sociaux</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Éléments visuels :</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fond dégradé navy (#1A2E4F → #223A63)</li>
                <li>• Logo LexAtlas en or (#D4AF37)</li>
                <li>• Titre principal en blanc</li>
                <li>• Sous-titre en or</li>
                <li>• Illustration de globe avec connexions</li>
                <li>• Accents décoratifs dorés</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Comment tester le partage :</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">1. Test en local :</h3>
              <p className="text-blue-800 text-sm">
                Copiez cette URL : <code className="bg-blue-100 px-2 py-1 rounded">http://localhost:3000</code>
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">2. Test sur les réseaux sociaux :</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• <strong>Instagram</strong> : Collez l'URL dans un message</li>
                <li>• <strong>WhatsApp</strong> : Partagez le lien</li>
                <li>• <strong>Facebook</strong> : Créez un post avec le lien</li>
                <li>• <strong>Twitter</strong> : Tweetez l'URL</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">3. Outils de test en ligne :</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener noreferrer" className="underline">Facebook Sharing Debugger</a></li>
                <li>• <a href="https://cards-dev.twitter.com/validator" target="_blank" rel="noopener noreferrer" className="underline">Twitter Card Validator</a></li>
                <li>• <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn Post Inspector</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/og/home.png" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-brand-navy text-white rounded-lg hover:bg-brand-gold hover:text-brand-navy transition-colors"
          >
            Voir l'image en pleine taille
          </a>
        </div>
      </div>
    </div>
  )
}
