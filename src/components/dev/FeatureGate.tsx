'use client';

export function FeatureGate({flag,children}:{flag?:string;children:React.ReactNode}) {
  if (typeof window==='undefined') return null;
  if (!flag) return children;
  return process.env.NEXT_PUBLIC_MINIMAL_BOOT==='1' ? null : children;
}
