export const fullSiteHomePath = "/home";

export const consultationLabel = "Request a Free Consultation";

export const conversationLabel = "Start a Conversation";

export const contactPagePath = "/contact";

export const consultationHref = contactPagePath;

export const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() || "/api/contact";

export const contactEmail = "info@meridianintegrations.com";

export const heroEyebrow = "COLORADO-BASED · SERVING BUSINESSES NATIONWIDE";

export const heroHeadline = [
  "Next-Gen Web Design.",
  "AI Search Optimization.",
  "Smarter Marketing.",
] as const;

export const heroParagraph =
  "Helping businesses get found, attract customers, and grow in an AI-driven world.";

export const heroPresence = "Colorado-based. Working nationwide.";

export const heroLocation =
  "Based in Colorado. Working with businesses nationwide.";

export type ServiceInclude =
  | string
  | {
      title: string;
      body: string;
    };

export type Service = {
  id: string;
  index: string;
  cardTitle: string;
  title: string;
  short: string;
  summary: string;
  body: string[];
  includesHeading: string;
  includes: ServiceInclude[];
};

export const services: Service[] = [
  {
    id: "website-design",
    index: "01",
    cardTitle: "Website Design & Development",
    title: "Website Design & Development",
    short: "Clear, fast websites people can trust.",
    summary:
      "Custom, fast-loading websites designed to impress visitors, build trust, and turn more clicks into customers.",
    body: [
      "Your website is often the first impression customers have of your business. We build modern, fast, mobile-friendly websites that look professional, establish credibility, and make it easy for visitors to take the next step.",
    ],
    includesHeading: "What's Included",
    includes: [
      "Custom website design tailored to your business",
      "Mobile-friendly layouts that look great on any device",
      "Fast loading times and reliable performance",
      "Clear navigation and effective calls to action",
      "Search-engine-friendly structure and content",
      "Ongoing maintenance and support options",
    ],
  },
  {
    id: "seo-visibility",
    index: "02",
    cardTitle: "SEO & AI Search Visibility",
    title: "SEO & AI Search Visibility",
    short: "Help customers find you through search.",
    summary:
      "Help customers discover your business through Google, Bing, and emerging AI-powered search tools like ChatGPT and Perplexity.",
    body: [
      "Your customers are searching for businesses like yours every day. We help them find you.",
      "We combine proven SEO techniques with Generative Engine Optimization (GEO) to strengthen your online visibility as the way people search continues to evolve.",
    ],
    includesHeading: "What's Included",
    includes: [
      "Website SEO audits and technical optimization",
      "Keyword research and content strategy",
      "Local SEO and location-based search optimization",
      "Google Search Console setup and performance monitoring",
      "Structured data and AI-friendly website architecture",
      "Content optimization for traditional and AI-powered search",
    ],
  },
  {
    id: "paid-advertising",
    index: "03",
    cardTitle: "Google Ads & Paid Advertising",
    title: "Google Ads & Paid Advertising",
    short: "Reach people already looking for what you offer.",
    summary:
      "Reach customers actively searching for your services with targeted campaigns, effective landing pages, and measurable results.",
    body: [
      "Reach potential customers at the moment they're searching for the products or services you offer.",
    ],
    includesHeading: "What's Included",
    includes: [
      "Google Ads campaign setup and management",
      "Keyword research and audience targeting",
      "Compelling ad copy and creative development",
      "Landing page design and optimization",
      "Conversion tracking and performance reporting",
      "Ongoing campaign improvements and budget optimization",
    ],
  },
  {
    id: "social-media",
    index: "04",
    cardTitle: "Social Media Marketing",
    title: "Social Media Marketing",
    short: "A steady presence where your customers spend time.",
    summary:
      "Build a stronger online presence with engaging content, consistent branding, and campaigns tailored to your audience.",
    body: [
      "We help businesses build a professional, consistent presence on platforms like Facebook, Instagram, and LinkedIn through engaging content, thoughtful campaigns, and a strategy tailored to their audience.",
    ],
    includesHeading: "What's Included",
    includes: [
      "Social media strategy and account optimization",
      "Branded graphics and engaging content",
      "Content calendars and scheduled posting",
      "Audience engagement and community management options",
      "Organic and paid social campaign planning",
      "Performance tracking and reporting",
    ],
  },
  {
    id: "automation",
    index: "05",
    cardTitle: "Business Automation & AI",
    title: "Business Automation & AI Solutions",
    short: "Practical tools that take repetitive work off your plate.",
    summary:
      "Reduce repetitive work, improve customer response times, and capture more opportunities with smart automation and practical AI solutions.",
    body: [
      "Spend less time managing repetitive tasks and more time growing your business.",
    ],
    includesHeading: "Solutions We Can Help You Explore",
    includes: [
      {
        title: "AI Receptionists",
        body: "Answer common questions, capture caller information, and offer an easy path to a real person.",
      },
      {
        title: "AI Website Chat",
        body: "Engage visitors, answer questions, and collect inquiries around the clock.",
      },
      {
        title: "CRM Integration",
        body: "Organize customer information, track leads, and manage follow-ups.",
      },
      {
        title: "Automated Follow-Ups",
        body: "Help businesses respond to inquiries and stay connected with prospective customers.",
      },
      {
        title: "Workflow Automation",
        body: "Connect existing applications and reduce repetitive administrative tasks.",
      },
      {
        title: "Custom AI Solutions",
        body: "Explore opportunities to apply AI to specific business challenges.",
      },
    ],
  },
];

export const whoWeAre = [
  "Meridian Integrations is a small Colorado studio. We build websites, help people find them, and connect the marketing around them.",
  "You talk with us directly. The work stays practical, and you can see what you're getting.",
] as const;

export const processIntro = "A straightforward path from the first conversation to a live site.";

export const processSteps = [
  {
    index: "01",
    title: "Conversation",
    body: "We learn what you need and what a good result looks like.",
  },
  {
    index: "02",
    title: "Build",
    body: "We design and build the work, and you review it before it goes live.",
  },
  {
    index: "03",
    title: "Launch & Grow",
    body: "We launch when it's ready. Website care, updates, SEO, and improvements are available afterward if you want them.",
  },
] as const;

export type PortfolioProject = {
  id: string;
  name: string;
  description: string;
  href?: string;
  image?: string;
  imageAlt?: string;
};

/**
 * Public portfolio. A project belongs here only after permission, completed work,
 * and an authorized screenshot are all confirmed. Draft records live in
 * portfolio-drafts.ts and are not imported by the site.
 */
export const publishedProjects: PortfolioProject[] = [];

export const showPortfolio = publishedProjects.length > 0;
