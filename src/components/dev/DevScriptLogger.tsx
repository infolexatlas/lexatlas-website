'use client';
import { useEffect } from 'react';

export default function DevScriptLogger() {
  useEffect(() => {
    const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src || '[inline]');
    console.log('[LexAtlas Dev] Loaded scripts:', scripts);
    
    // Also log any elements with suspicious text
    const suspiciousText = Array.from(document.querySelectorAll('*')).filter(el => {
      const text = el.textContent || '';
      return text.includes('missing required error components') || 
             text.includes('refreshing...') ||
             text.includes('error components');
    });
    
    if (suspiciousText.length > 0) {
      console.warn('[LexAtlas Dev] Found suspicious elements:', suspiciousText);
    }
  }, []);
  return null;
}
