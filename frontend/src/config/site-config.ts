import type { Metadata } from "next";

export const siteConfig: Metadata = {
  metadataBase: new URL("https://unisights.vercel.app"), 
  title: {
    default: "UniSights",
    template: "%s | UniSights",
  },

  manifest: "/site.webmanifest",

  applicationName: "UniSights",

  creator: "Enigma", 

  authors: [
    {
      name: "Enigam", 
      url: "https://your-portfolio.com", 
    },
  ],

  icons: [{ rel: "icon", url: "/favicon.ico" }],

  description:
    "UniSights is the smart campus platform that unifies university data into actionable insights. Get AI-powered course recommendations, event predictions, and academic analytics in one intuitive dashboard.",

  keywords: [
    "university app",
    "campus intelligence",
    "student planner",
    "academic analytics",
    "course recommender",
    "event tracker",
    "AI for education",
    "smart campus",
    "UniSights",
    "student productivity",
  ],

  openGraph: {
    title: "UniSights",
    description:
      "Your unified campus companion. AI-powered insights for courses, events, and academic success - all in one platform.",
    siteName: "UniSights",
    locale: "en_US",
    url: new URL("https://unisights.app"), // Update with your domain
    images: ["https://unisights.app/og-image.png"], // Update with your OG image path
    type: "website",
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

  twitter: {
    title: "UniSights",
    creator: "@YourTwitterHandle", // Replace with your Twitter
    card: "summary_large_image",
    images: ["https://unisights.app/twitter-og-image.png"], // Update path
  },
};

export const links = {
  github: "https://github.com/your-username/unisights", // Update
  twitter: "https://twitter.com/YourTwitterHandle", // Update
  portfolio: "https://your-portfolio.com", // Update
};