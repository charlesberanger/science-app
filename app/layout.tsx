import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Doto } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  weight: "700",
});

export const metadata: Metadata = {
  title: {
    template: "%s · Science",
    default: "Science — Fluid Dynamics Challenge",
  },
  description:
    "Compete in the Science Fluid Dynamics Challenge. Submit your microgravity tube design, track your ranking, and win from a $25,000 prize pool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script — reads localStorage before first paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${doto.variable} antialiased bg-background text-foreground`}
       
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-lime-400 focus:px-4 focus:py-2 focus:font-mono focus:text-ui focus:text-black"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
