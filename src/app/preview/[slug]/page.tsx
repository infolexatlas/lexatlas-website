import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import { slugToPairKey, expandPairTitle, isValidPrioritySlug, getSamplePdfPath } from '@/lib/kits.config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const pairKey = slugToPairKey(slug)
  
  if (!pairKey) {
    return {
      title: 'Preview Not Found',
      description: 'The requested preview could not be found.'
    }
  }

  const title = expandPairTitle(pairKey)
  
  return {
    title: `Free Preview - ${title} Marriage Kit - LexAtlas`,
    description: `Get a free preview of our ${title} marriage kit. Enter your email to receive a sample.`,
  }
}

export default function PreviewPage({ params }: PageProps) {
  const { slug } = params
  
  // Validate slug
  if (!isValidPrioritySlug(slug)) {
    notFound()
  }

  const pairKey = slugToPairKey(slug)
  if (!pairKey) {
    notFound()
  }

  const title = expandPairTitle(pairKey)
  
  // Check if sample PDF exists using the new helper
  const samplePath = getSamplePdfPath(slug)
  const publicDir = path.join(process.cwd(), 'public')
  const fullSamplePath = path.join(publicDir, samplePath.substring(1)) // Remove leading slash
  const hasSample = fs.existsSync(fullSamplePath)

  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">
              Free Preview: {title}
            </CardTitle>
            <CardDescription className="text-lg">
              Get a sample of our comprehensive marriage guide
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasSample ? (
              <form action="/api/preview/send" method="POST" className="space-y-6">
                <input type="hidden" name="slug" value={slug} />
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your marriage plans or ask any questions..."
                    rows={3}
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  Get Free Preview
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  We'll send you a sample PDF with key information about the {title} marriage process.
                  No spam, unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Preview coming soon for {title}
                </p>
                <Button asChild>
                  <a href={`/kits/${slug}`}>
                    View Full Kit
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
