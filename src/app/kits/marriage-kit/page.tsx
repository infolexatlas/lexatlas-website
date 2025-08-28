import { Metadata } from 'next'
import { CountryPairSelector } from '@/components/CountryPairSelector'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'International Marriage Kits | LexAtlas',
  description: 'Get comprehensive guides for international marriage procedures between any two countries. Expert-built PDF guides with step-by-step instructions.',
  openGraph: {
    title: 'International Marriage Kits | LexAtlas',
    description: 'Get comprehensive guides for international marriage procedures between any two countries.',
    images: [
      {
        url: '/og/kits.svg',
        width: 1200,
        height: 630,
        alt: 'International Marriage Kits'
      }
    ]
  }
}

export default function MarriageKitLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            International Marriage Kits
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Navigate the complexities of international marriage with our expert-built guides. 
            Choose two countries to get a comprehensive PDF guide tailored to your specific situation.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Select Countries</h3>
                <p className="text-gray-600 text-sm">
                  Choose the two countries involved in your international marriage
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Get Your Guide</h3>
                <p className="text-gray-600 text-sm">
                  Receive a comprehensive PDF guide with step-by-step instructions
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Follow Steps</h3>
                <p className="text-gray-600 text-sm">
                  Complete your marriage process with confidence and clarity
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <CountryPairSelector />
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What's Included in Each Kit
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-3">Documentation Requirements</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Required certificates and forms</li>
                <li>• Translation requirements</li>
                <li>• Apostille/legalization needs</li>
                <li>• Embassy/consulate procedures</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-3">Process Timeline</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li>• Step-by-step timeline</li>
                <li>• Processing times</li>
                <li>• Important deadlines</li>
                <li>• Contact information</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose LexAtlas?
            </h2>
            <p className="text-gray-600 mb-6">
              Our guides are created by legal experts with years of experience in international marriage procedures. 
              We've helped thousands of couples navigate the complex requirements successfully.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-600">435 Country Pairs</div>
                <div className="text-gray-500">Comprehensive coverage</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">Expert-Reviewed</div>
                <div className="text-gray-500">Legal professionals</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">Always Updated</div>
                <div className="text-gray-500">Current requirements</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
