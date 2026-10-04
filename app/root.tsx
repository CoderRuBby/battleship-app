import {
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router';
import type { Route } from './+types/root';
import appStylesHref from './app.css?url';

export default function Layout() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://coderrubby.github.io/battleship-app/'
        />
        <meta property='og:title' content='Battleship' />
        <meta property='og:description' content='Battleship the game.' />
        <meta
          property='og:image'
          content='https://coderrubby.github.io/battleship-app/images/og-battleship.png'
        />
        <link rel='stylesheet' href={appStylesHref} />
        <link
          rel='icon'
          type='image/png'
          href={`${import.meta.env.BASE_URL}images/favicon.png`}
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main id='error-page'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
