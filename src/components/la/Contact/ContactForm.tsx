'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2, MessageSquare, Clock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface FormData {
  name: string
  email: string
  topic: string
  country: string
  message: string
  honeypot: string
}

interface FormErrors {
  name?: string
  email?: string
  topic?: string
  message?: string
}

const TOPICS = [
  { value: 'support', label: 'Support' },
  { value: 'billing', label: 'Billing' },
  { value: 'product', label: 'Product Question' },
  { value: 'press', label: 'Press' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'legal', label: 'Legal' },
]

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    topic: '',
    country: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return undefined
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
        return undefined
      case 'topic':
        if (!value) return 'Please select a topic'
        return undefined
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        return undefined
      default:
        return undefined
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const error = validateField(name as keyof FormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.honeypot) {
      return // Bot detected
    }

    // Validate all fields
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'honeypot' && key !== 'country') {
        const error = validateField(key as keyof FormData, formData[key as keyof FormData])
        if (error) newErrors[key as keyof FormErrors] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          country: formData.country,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', topic: '', country: '', message: '', honeypot: '' })
      } else {
        const data = await response.json()
        setSubmitError(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-brand-muted/20 to-white border border-brand-navy/10 shadow-premium">
          {/* Success Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-brand-muted/30" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-deep/5 to-transparent rounded-full translate-y-12 -translate-x-12" />
          
          <div className="relative p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mb-8 shadow-soft">
              <CheckCircle className="h-10 w-10 text-emerald-700" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-brand-deep mb-4">
              Message Sent Successfully!
            </h3>
            <p className="text-lg text-brand-textMuted mb-8 leading-relaxed">
              Thanks for reaching out! We'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild className="h-12 px-8 rounded-xl2 border-brand-navy/20 text-brand-deep hover:bg-brand-muted">
                <a href="/faq">Browse FAQ</a>
              </Button>
              <Button asChild variant="default" className="h-12 px-8 rounded-xl2">
                <a href="/kits">View Marriage Kits</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-white border border-brand-navy/10 shadow-soft">
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/5 via-transparent to-brand-deep/5" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-brand-deep/10 to-transparent rounded-full -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-brand-deep/10 to-transparent rounded-full translate-y-16 -translate-x-16" />
        
        <div className="relative p-8 md:p-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-brand-muted text-brand-deep rounded-full text-sm font-medium mb-6 border border-brand-navy/10">
              <MessageSquare className="w-5 h-5 text-brand-gold" />
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-deep mb-4">
              Send us a Message
            </h2>
            <div className="w-10 h-1 bg-brand-gold/60 rounded-full mx-auto mb-6" />
            <p className="text-lg text-brand-textMuted mb-8 max-w-2xl mx-auto">
              We typically respond as soon as possible during business days. 
              Our support team is here to help with any questions.
            </p>
            
            {/* Premium Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-soft border border-brand-navy/10">
                <div className="w-8 h-8 bg-brand-gold/10 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-brand-gold" />
                </div>
                <span className="text-sm font-semibold text-brand-deep">
                  Avg. reply: ASAP
                </span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-soft border border-brand-navy/10">
                <div className="w-8 h-8 bg-brand-gold/10 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-brand-gold" />
                </div>
                <span className="text-sm font-semibold text-brand-deep">
                  Business hours: Mon–Fri
                </span>
              </div>
            </div>
          </div>
          
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name and Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-semibold text-brand-deep flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                  Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your full name"
                  className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm focus:bg-white transition-all duration-200 ${
                    errors.name 
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                      : 'border-brand-navy/50 focus:border-brand-navy focus-visible:!ring-2 focus-visible:!ring-brand-navy focus-visible:ring-offset-2'
                  }`}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-brand-deep flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your@email.com"
                  className={`h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm focus:bg-white transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                      : 'border-brand-navy/50 focus:border-brand-navy focus-visible:!ring-2 focus-visible:!ring-brand-navy focus-visible:ring-offset-2'
                  }`}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Topic and Country */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="topic" className="text-sm font-semibold text-brand-deep flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                  Topic *
                </Label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-14 rounded-2xl border-2 bg-white/80 backdrop-blur-sm px-4 py-2 text-sm focus:bg-white transition-all duration-200 ${
                    errors.topic 
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                      : 'border-brand-navy/50 focus:border-brand-navy focus-visible:!ring-2 focus-visible:!ring-brand-navy focus-visible:ring-offset-2'
                  }`}
                  aria-describedby={errors.topic ? 'topic-error' : undefined}
                >
                  <option value="">Select a topic</option>
                  {TOPICS.map(topic => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
                {errors.topic && (
                  <p id="topic-error" className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.topic}
                  </p>
                )}
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="country" className="text-sm font-semibold text-brand-deep flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-gold/50 rounded-full"></span>
                  Country (Optional)
                </Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Your country"
                  className="h-14 rounded-2xl border-2 border-brand-navy/50 bg-white/80 backdrop-blur-sm focus:bg-white focus:border-brand-navy focus-visible:!ring-2 focus-visible:!ring-brand-navy focus-visible:ring-offset-2 transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Message */}
            <div className="space-y-3">
              <Label htmlFor="message" className="text-sm font-semibold text-brand-deep flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell us how we can help you..."
                className={`rounded-2xl border-2 bg-white/80 backdrop-blur-sm resize-none transition-all duration-200 ${
                  errors.message 
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                    : 'border-brand-navy/50 focus:border-brand-navy focus-visible:!ring-2 focus-visible:!ring-brand-navy focus-visible:ring-offset-2'
                }`}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </p>
              )}
              <p className="text-sm text-brand-textMuted flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-gold/50 rounded-full"></span>
                Minimum 10 characters. We'll get back to you as soon as possible.
              </p>
            </div>

            {/* Honeypot field */}
            <div className="hidden">
              <input
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                aria-hidden="true"
              />
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="p-6 bg-gradient-to-r from-red-50 to-red-100/50 border-2 border-red-200 rounded-2xl">
                <p className="text-sm text-red-700 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {submitError}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-16 text-lg font-semibold rounded-2xl text-brand-gold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="mr-3 h-5 w-5" />
                  Send a message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
