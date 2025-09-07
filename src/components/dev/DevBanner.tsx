'use client';

export default function DevBanner() {
  const isFakeCheckout = process.env.NEXT_PUBLIC_FAKE_CHECKOUT === '1';
  
  if (!isFakeCheckout || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-900 text-center py-1 px-4 text-sm font-medium z-40">
      🧪 Fake checkout enabled — no real payment
    </div>
  );
}
