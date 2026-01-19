import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Trainer San Jose | SunFM Functional Movement Training",
  description:
    "Looking for a personal trainer in San Jose or the South Bay Area? Jeffrey Sun helps busy professionals eliminate pain, build functional strength, and train for health longevity. Serving Sunnyvale, Cupertino, Santa Clara, Mountain View & online.",
  keywords: [
    "personal trainer San Jose",
    "personal trainer South Bay",
    "personal trainer Sunnyvale",
    "personal trainer Cupertino",
    "personal trainer Santa Clara",
    "personal trainer Mountain View",
    "functional movement training",
    "mobility training Bay Area",
    "strength training San Jose",
    "fitness trainer South Bay",
  ],
  openGraph: {
    title: "Personal Trainer San Jose | SunFM Functional Movement",
    description:
      "Personal trainer in San Jose & South Bay Area. 10,000+ sessions delivered. Free consultation available.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
