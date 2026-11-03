export const fullSiteHomePath = "/";

export const consultationLabel = "Request a Free Consultation";

export const conversationLabel = "Start a Conversation";

export const contactPagePath = "/contact";

export const consultationHref = contactPagePath;

export const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() || "/api/contact";

export const contactEmail = "info@meridianintegrations.com";

export const heroHeadline =
  "Meridian Integrations builds high-performance websites and the integrated marketing infrastructure around them.";

export const heroSubheading =
  "No agency middlemen. Just practical, direct, and transparent work.";

export const heroLocation =
  "Based in Colorado. Working with businesses nationwide.";

export type PortfolioProject = {
  id: string;
  name: string;
  category: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  mobileImage?: string;
  mobileImageAlt?: string;
};

/**
 * Public portfolio. A project belongs here only after permission, completed work,
 * and an authorized screenshot are all confirmed. Draft records live in
 * portfolio-drafts.ts and are not imported by the site.
 */
export const publishedProjects: PortfolioProject[] = [
  {
    id: "mobile-stress-recovery",
    name: "Mobile Stress Recovery",
    category: "Website Design & Development",
    description: "Custom website design and development for an on-site stress recovery practice.",
    href: "https://www.mobilestressrecovery.com",
    image: "/work/mobile-stress-recovery-desktop.webp",
    imageAlt: "Desktop view of the Mobile Stress Recovery homepage.",
    mobileImage: "/work/mobile-stress-recovery-mobile.webp",
    mobileImageAlt: "Mobile view of the Mobile Stress Recovery homepage.",
  },
];

export const showPortfolio = publishedProjects.length > 0;
