export const fullSiteHomePath = "/home";

export const consultationLabel = "Request a Free Consultation";

export const contactPagePath = "/contact";

export const consultationHref = contactPagePath;

export const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() || "/api/contact";

export const contactEmail = "info@meridianintegrations.com";

export const heroEyebrow = "COLORADO-BASED · SERVING BUSINESSES NATIONWIDE";

export const heroHeadline = [
  "Better Websites.",
  "Smarter Marketing.",
  "Stronger Businesses.",
] as const;

export const heroParagraph =
  "We design high-performance websites, help businesses get found on Google and AI-powered search, and build marketing and automation solutions that generate leads and support growth.";

export const heroLocation =
  "Based in Colorado. Working with businesses nationwide.";

export const heroPoints = [
  {
    title: "Built for Performance",
    body: "Fast, mobile-friendly websites designed to make a great first impression.",
  },
  {
    title: "Search & AI Visibility",
    body: "Help customers discover your business through Google and emerging AI-powered search.",
  },
  {
    title: "Marketing That Converts",
    body: "Connect your website, advertising, and digital marketing around real business goals.",
  },
] as const;

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

export const whyIntro = [
  "With over 20 years of information technology experience behind Meridian Integrations, we bring technical knowledge and practical problem-solving to every project.",
] as const;

export const principles = [
  {
    title: "20+ Years of Technical Experience",
    body: "From enterprise IT systems to modern web technologies, we understand the infrastructure, security, and integrations that keep businesses running.",
  },
  {
    title: "Clear Communication & Honest Pricing",
    body: "You'll know what we're building, why we're recommending it, and what it costs. No unnecessary complexity or confusing technical jargon.",
  },
  {
    title: "One Connected Digital Strategy",
    body: "Your website, SEO, advertising, social media, and automation should work together to support your business goals—not operate as disconnected services.",
  },
] as const;

export const processIntro =
  "Every business is different. We take the time to understand your goals, develop a practical strategy, and build solutions designed around your needs. You'll know what to expect at every stage.";

export const processSteps = [
  {
    index: "01",
    title: "Discovery",
    body: "We start by learning about your business, your customers, and what you want to accomplish. We'll discuss your challenges, opportunities, and priorities.",
  },
  {
    index: "02",
    title: "Strategy",
    body: "We develop a clear plan tailored to your goals, outlining recommended services, project scope, timelines, and pricing before work begins.",
  },
  {
    index: "03",
    title: "Design & Build",
    body: "We bring your project to life, whether that's a new website, a marketing campaign, or a business automation solution. You'll have opportunities to review progress and provide feedback.",
  },
  {
    index: "04",
    title: "Launch & Grow",
    body: "Once everything is tested and approved, we launch. From there, we can monitor performance, make improvements, and provide ongoing support as your business evolves.",
  },
] as const;

export type FeaturedProject = {
  id: string;
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
  href?: string;
};

export const featuredProjects: FeaturedProject[] = [];

export const previewProjectPlaceholders: FeaturedProject[] = [
  {
    id: "placeholder-1",
    name: "Internal placeholder",
    description: "",
  },
  {
    id: "placeholder-2",
    name: "Internal placeholder",
    description: "",
  },
  {
    id: "placeholder-3",
    name: "Internal placeholder",
    description: "",
  },
];

export const visibleProjects =
  process.env.NODE_ENV === "development" ? previewProjectPlaceholders : featuredProjects;

/** Published portfolio only. Stays false until featuredProjects has approved work. */
export const showPortfolio = featuredProjects.length > 0;
