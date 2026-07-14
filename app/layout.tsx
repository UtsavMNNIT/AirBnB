import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amber Nights · Private Jacuzzi Hideaway in Candolim - Airbnb",
  description:
    "Entire serviced apartment in Candolim, India. Cozy 1BHK with a private jacuzzi, pool, high-speed WiFi and Smart TV. Guest favourite.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
