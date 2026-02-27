import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const SITE_URL = "https://olawale.design";
const SITE_NAME = "Olawale Onasanya — Web Designer";
const SITE_DESCRIPTION =
  "I'm Olawale Onasanya, a web designer based in Nigeria. I create clean, strategic, and user-focused websites that turn ideas into impactful digital experiences.";



const Helvetica = localFont({
  src: [
    {
      path: '../fonts/HelveticaNeueUltraLight.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueHeavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeueBlack.otf',
      weight: '900',
      style: 'normal',
    },
  ]
  ,
  variable: "--font-Helvetica",
})


const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "web designer",
    "web design",
    "UI/UX design",
    "freelance web designer",
    "Olawale Onasanya",
    "Nigeria web designer",
    "responsive design",
    "landing page design",
    "prototyping",
    "Figma",
  ],
  authors: [{ name: "Olawale Onasanya", url: SITE_URL }],
  creator: "Olawale Onasanya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: "@olawalewebdsgn",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${Helvetica.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
