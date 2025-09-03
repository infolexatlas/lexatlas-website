import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  topic: z.string().min(1, 'Topic is required'),
  country: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = contactSchema.parse(body)
    
    // Here you would typically:
    // 1. Send email via your email service (SendGrid, Resend, etc.)
    // 2. Store in database
    // 3. Send notification to your team
    
    // For now, we'll just log and return success
    console.log('Contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      topic: validatedData.topic,
      country: validatedData.country,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.ip,
      userAgent: request.headers.get('user-agent'),
    })
    
    // TODO: Implement actual email sending
    // Example with a hypothetical email service:
    // await sendEmail({
    //   to: 'contact@lexatlas.com',
    //   subject: `New contact from ${validatedData.name} - ${validatedData.topic}`,
    //   body: `
    //     Name: ${validatedData.name}
    //     Email: ${validatedData.email}
    //     Topic: ${validatedData.topic}
    //     Country: ${validatedData.country || 'Not specified'}
    //     Message: ${validatedData.message}
    //   `
    // })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
