// DISCOVERY NOTE: Legacy email template file - all functions deprecated
// Use renderLeadMagnetEmailHTML() from @/emails/leadmagnet instead

export async function sendLeadSampleEmail(to: string, sampleUrl?: string) {
  throw new Error("Legacy email template removed. Use renderLeadMagnetEmailHTML() from @/emails/leadmagnet");
}

export async function sendLeadMagnetEmail(to: string) {
  throw new Error("Legacy email template removed. Use renderLeadMagnetEmailHTML() from @/emails/leadmagnet");
}

export async function sendNewsletterEmail(to: string) {
  throw new Error("Legacy email template removed. Use renderLeadMagnetEmailHTML() from @/emails/leadmagnet");
}
