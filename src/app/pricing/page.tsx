'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { TrustBadges } from '@/components/TrustBadges'
import FAQ from '@/components/FAQ'
import { PRIORITY_SLUGS, expandPairTitle } from '@/lib/kits.config'
import { DEFAULT_EUR, PRICE_BUNDLE_3, PRICE_BUNDLE_10 } from '@/lib/pricing'

export default function PricingPage() {
  const [selectedSingle, setSelectedSingle] = useState<string>('')
  const [selectedBundle3, setSelectedBundle3] = useState<string[]>([])

  const handleSinglePurchase = async () => {
    if (!selectedSingle) return
    
    const formData = new FormData()
    formData.append('slug', selectedSingle)
    formData.append('pairKey', selectedSingle.replace('-', '-').toUpperCase())
    
    const response = await fetch('/api/checkout/single', {
      method: 'POST',
      body: formData
    })
    
    const data = await response.json()
    if (data.url) {
      window.location.href = data.url
    }
  }

  const handleBundle3Purchase = async () => {
    if (selectedBundle3.length !== 3) return
    
    const response = await fetch('/api/checkout/bundle3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slugs: selectedBundle3 })
    })
    
    const data = await response.json()
    if (data.url) {
      window.location.href = data.url
    }
  }

  const handleBundle10Purchase = async () => {
    const response = await fetch('/api/checkout/bundle10', {
      method: 'POST'
    })
    
    const data = await response.json()
    if (data.url) {
      window.location.href = data.url
    }
  }

  const handleBundle3Toggle = (slug: string) => {
    setSelectedBundle3(prev => {
      if (prev.includes(slug)) {
        return prev.filter(s => s !== slug)
      } else if (prev.length < 3) {
        return [...prev, slug]
      }
      return prev
    })
  }

  return (
    <Container className="py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Choose Your Package
          </h1>
          <p className="text-xl text-muted-foreground">
            Select the perfect marriage kit option for your needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Single Kit */}
          <Card className="relative" data-testid="pricing-card">
            <CardHeader>
              <CardTitle>Single Kit</CardTitle>
              <CardDescription>
                Perfect for one specific country pair
              </CardDescription>
              <div className="text-3xl font-bold text-primary">
                {DEFAULT_EUR.price / 100} €
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Complete marriage guide</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Document checklist</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Legal requirements</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Instant download</span>
                </li>
              </ul>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Choose Country Pair</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Country Pair</DialogTitle>
                    <DialogDescription>
                      Choose the country pair for your marriage kit
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Label htmlFor="country-pair">Country Pair</Label>
                    <Select value={selectedSingle} onValueChange={setSelectedSingle}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country pair" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRIORITY_SLUGS.map((slug) => {
                          const pairKey = slug.replace('-', '-').toUpperCase()
                          const title = expandPairTitle(pairKey)
                          return (
                            <SelectItem key={slug} value={slug}>
                              {title}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <Button 
                      onClick={handleSinglePurchase}
                      disabled={!selectedSingle}
                      className="w-full"
                    >
                      Buy Now – {DEFAULT_EUR.price / 100} €
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Bundle of 3 */}
          <Card className="relative border-primary" data-testid="pricing-card">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <CardHeader>
              <CardTitle>Bundle of 3</CardTitle>
              <CardDescription>
                Choose any 3 country pairs
              </CardDescription>
              <div className="text-3xl font-bold text-primary">
                {PRICE_BUNDLE_3.price / 100} €
              </div>
              <div className="text-sm text-muted-foreground">
                Save {((DEFAULT_EUR.price * 3 - PRICE_BUNDLE_3.price) / (DEFAULT_EUR.price * 3) * 100).toFixed(0)}%
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>3 complete marriage guides</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Mix and match country pairs</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All document checklists</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Instant downloads</span>
                </li>
              </ul>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Choose 3 Pairs</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Select 3 Country Pairs</DialogTitle>
                    <DialogDescription>
                      Choose exactly 3 country pairs for your bundle
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {PRIORITY_SLUGS.map((slug) => {
                        const pairKey = slug.replace('-', '-').toUpperCase()
                        const title = expandPairTitle(pairKey)
                        return (
                          <div key={slug} className="flex items-center space-x-2">
                            <Checkbox
                              id={slug}
                              checked={selectedBundle3.includes(slug)}
                              onCheckedChange={() => handleBundle3Toggle(slug)}
                              disabled={!selectedBundle3.includes(slug) && selectedBundle3.length >= 3}
                            />
                            <Label htmlFor={slug}>{title}</Label>
                          </div>
                        )
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Selected: {selectedBundle3.length}/3
                    </div>
                    <Button 
                      onClick={handleBundle3Purchase}
                      disabled={selectedBundle3.length !== 3}
                      className="w-full"
                    >
                      Buy Bundle – {PRICE_BUNDLE_3.price / 100} €
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Full Pack */}
          <Card className="relative" data-testid="pricing-card">
            <CardHeader>
              <CardTitle>Full Pack</CardTitle>
              <CardDescription>
                All 10 priority country pairs
              </CardDescription>
              <div className="text-3xl font-bold text-primary">
                {PRICE_BUNDLE_10.price / 100} €
              </div>
              <div className="text-sm text-muted-foreground">
                Save {((DEFAULT_EUR.price * 10 - PRICE_BUNDLE_10.price) / (DEFAULT_EUR.price * 10) * 100).toFixed(0)}%
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All 10 marriage guides</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Complete collection</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Maximum value</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Instant downloads</span>
                </li>
              </ul>
              
              <Button onClick={handleBundle10Purchase} className="w-full">
                Get Full Pack – {PRICE_BUNDLE_10.price / 100} €
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trust Section */}
        <TrustBadges />

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <FAQ />
        </div>
      </div>
    </Container>
  )
}
