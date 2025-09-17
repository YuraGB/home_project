"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Something went wrong | Favly</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Oops Something went wrong" />
      </head>
      <body className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Something went wrong</h2>
          <p className="mt-2 text-gray-400">
            We couldn’t load this page. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
