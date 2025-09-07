'use client'

import { isDev, disableExternal } from '@/lib/devFlags'

export function DebugBanner() {
  if (!isDev || !disableExternal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-yellow-400 text-black text-center py-1 text-sm font-mono">
      🧪 Debug Safe Mode — external scripts off, fetches timeout @ 3s
    </div>
  );
}
