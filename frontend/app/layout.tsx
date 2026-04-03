import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SportMind AI — Next-Gen Sports Intelligence",
  description:
    "AI-powered sports performance platform with RAG-based coaching, video biomechanics analysis, and athlete management tools powered by Gemini.",
  keywords: ["sports AI", "performance analytics", "biomechanics", "coaching", "athlete management"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
