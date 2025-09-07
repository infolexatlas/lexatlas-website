import { Shield, Download, Clock } from 'lucide-react'

export function ReassuranceStrip() {
  return (
    <div className="mt-16 pt-8 border-t border-brand-gray/30">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12">
        {/* Secure Payment */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-navy/10 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-brand-gold" />
          </div>
          <span className="text-sm font-medium text-brand-navy">
            Secure Payment
          </span>
        </div>
        
        {/* Instant Download */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-navy/10 rounded-full flex items-center justify-center">
            <Download className="w-4 h-4 text-brand-gold" />
          </div>
          <span className="text-sm font-medium text-brand-navy">
            Instant Download
          </span>
        </div>
        
        {/* Lifetime Access */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-navy/10 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-brand-gold" />
          </div>
          <span className="text-sm font-medium text-brand-navy">
            Lifetime Access
          </span>
        </div>
      </div>
    </div>
  )
}
