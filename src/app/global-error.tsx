'use client';

import * as Sentry from '@sentry/nextjs';
import React from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  Sentry.captureException(error);

  return (
    <html>
      <body>
        <div style={{ padding: 24 }}>
          <h1>Something went wrong</h1>
          <p>We’ve been notified and are looking into it.</p>
        </div>
      </body>
    </html>
  );
}


