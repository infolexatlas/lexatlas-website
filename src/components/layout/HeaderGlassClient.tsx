"use client";
import { useEffect } from "react";

export default function HeaderGlassClient() {
  useEffect(() => {
    const el = document.querySelector('header[data-glass]');
    if (!el) return;
    const onScroll = () => el.setAttribute('data-scrolled', window.scrollY > 8 ? 'true' : 'false');
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}
