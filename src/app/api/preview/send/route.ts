import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { isValidPrioritySlug, expandPairTitle, getSamplePdfPath } from '@/lib/kits.config'

// Simple email sending function (replace with Resend in production)
async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = process.env.RESEND_API_KEY
  
  if (!resendApiKey) {
    console.log('RESEND_API_KEY not set, skipping email send')
    return { success: true }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'LexAtlas <noreply@lexatlas.com>',
        to: [to],
        subject,
        html,
      }),
    })

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.statusText}`)
    }

    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

// Store lead in JSONL file
function storeLead(data: any) {
  try {
    const leadsDir = path.join(process.cwd(), '.data')
    const leadsFile = path.join(leadsDir, 'leads.jsonl')
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(leadsDir)) {
      fs.mkdirSync(leadsDir, { recursive: true })
    }
    
    const leadEntry = {
      ...data,
      timestamp: new Date().toISOString(),
    }
    
    fs.appendFileSync(leadsFile, JSON.stringify(leadEntry) + '\n')
    return true
  } catch (error) {
    console.error('Error storing lead:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const name = formData.get('name') as string
    const message = formData.get('message') as string
    const slug = formData.get('slug') as string

    // Validate inputs
    if (!email || !name || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!isValidPrioritySlug(slug)) {
      return NextResponse.json(
        { error: 'Invalid slug' },
        { status: 400 }
      )
    }

    // Get sample PDF path with global fallback
    const samplePath = getSamplePdfPath(slug)
    const publicDir = path.join(process.cwd(), 'public')
    const fullSamplePath = path.join(publicDir, samplePath.substring(1)) // Remove leading slash
    const hasSample = fs.existsSync(fullSamplePath)

    if (!hasSample) {
      return NextResponse.json(
        { error: 'Sample not available' },
        { status: 404 }
      )
    }

    const pairKey = slug.replace('-', '-').toUpperCase()
    const title = expandPairTitle(pairKey)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin
    const downloadUrl = `${siteUrl}${samplePath}`

    // Send email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your Free Marriage Kit Preview</h2>
        <p>Hi ${name},</p>
        <p>Thank you for requesting a preview of our ${title} marriage kit!</p>
        <p>Here's your free sample with key information about the marriage process between ${title}:</p>
        <p><a href="${downloadUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Download Sample PDF</a></p>
        <p>This sample includes:</p>
        <ul>
          <li>Overview of the marriage process</li>
          <li>Key document requirements</li>
          <li>Important timelines to consider</li>
          <li>Contact information for authorities</li>
        </ul>
        <p>Ready for the complete guide? <a href="${request.nextUrl.origin}/kits/${slug}">Get the full marriage kit</a> for just 29€.</p>
        <p>Best regards,<br>The LexAtlas Team</p>
      </div>
    `

    const emailResult = await sendEmail(
      email,
      `Your Free ${title} Marriage Kit Preview`,
      emailHtml
    )

    // Store lead
    const leadData = {
      email,
      name,
      message: message || '',
      slug,
      pairKey,
      title,
      source: 'preview_form'
    }
    
    storeLead(leadData)

    return NextResponse.json({ 
      success: true,
      message: 'Preview sent successfully!',
      emailSent: emailResult.success
    })
  } catch (error) {
    console.error('Preview send error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
