export type BlueprintStep = {
  title: string;
  detail: string;
};

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  keywordTargets: readonly string[];
  blueprint: readonly [BlueprintStep, BlueprintStep, BlueprintStep];
};

export const industries: Industry[] = [
  {
    slug: "roofing-contractors",
    name: "Roofing Contractors",
    summary:
      "Hail, insurance, and replacement demand across the Front Range, captured before storm-chaser ads buy the click.",
    keywordTargets: [
      "roofing contractor Denver",
      "hail damage roof repair",
      "roof replacement near me",
      "emergency roof leak Denver",
      "commercial roofing Front Range",
    ],
    blueprint: [
      {
        title: "Map entity and service-area architecture",
        detail:
          "Separate storm, replacement, and repair intent. Set one Google Business Profile category stack, build neighborhood hubs that do not cannibalize the primary city page, and answer insurance-intent questions the way homeowners and adjusters actually search.",
      },
      {
        title: "Technical indexation for high-ticket queries",
        detail:
          "Ship roofing schema, an image path for storm documentation, and mobile landing pages that pass Core Web Vitals. Canonical rules keep location templates from spawning duplicate hail pages.",
      },
      {
        title: "Map-pack conversion system",
        detail:
          "Put call tracking on the profile and every landing URL. Run a weekly photo and review cadence timed to hail season, and keep citations on the same name, address, and phone the website publishes.",
      },
    ],
  },
  {
    slug: "hvac-plumbing",
    name: "HVAC & Plumbing",
    summary:
      "Emergency breakdowns and replacement tickets, split into two paths so the after-hours call and the install estimate both convert.",
    keywordTargets: [
      "HVAC repair Denver",
      "furnace replacement Front Range",
      "emergency plumber Denver",
      "water heater installation",
      "AC repair near me",
    ],
    blueprint: [
      {
        title: "Split emergency and replacement intent",
        detail:
          "Emergency plumber queries and furnace-replacement queries do not belong on the same URL. One path is instant click-to-call for breakdowns. The other is an estimate architecture for high-ticket replacement.",
      },
      {
        title: "Technical trust signals",
        detail:
          "Service schema with areaServed, fast mobile templates, and indexable city pages that inherit one technical template instead of a copied blog post per suburb.",
      },
      {
        title: "After-hours map pack capture",
        detail:
          "Align profile hours, messaging, and call assets to nights and weekends. Trigger review requests after completed emergency jobs, when a new rating still moves the pack.",
      },
    ],
  },
  {
    slug: "property-management",
    name: "Property Management",
    summary:
      "Commercial and multifamily managers along the Front Range, reached at the moment they search for a vendor instead of waiting on a referral.",
    keywordTargets: [
      "property management Denver",
      "commercial property manager DTC",
      "HOA maintenance Denver",
      "multifamily property management Aurora",
      "Denver property management company",
    ],
    blueprint: [
      {
        title: "Portfolio and submarket architecture",
        detail:
          "A company page, asset-class pages, and submarket pages with operational proof. A Denver Tech Center manager and an Aurora multifamily owner should not land on the same generic pitch.",
      },
      {
        title: "Technical entity clarity",
        detail:
          "Organization and LocalBusiness schema that distinguish the management company from the buildings it operates, plus internal links between submarkets and service lines.",
      },
      {
        title: "Vendor-search conversion",
        detail:
          "Pages built for boards and asset managers: service area, response time, and proof above the fold, with tracking on tour requests, RFP clicks, and calls.",
      },
    ],
  },
  {
    slug: "dental-seo",
    name: "Dental SEO",
    summary:
      "New-patient demand for emergency, implant, and aligner searches, tied to a real practice entity instead of a doorway page per suburb.",
    keywordTargets: [
      "dentist Denver",
      "emergency dentist near me",
      "Invisalign Denver",
      "dental implants Front Range",
      "family dentist Aurora",
    ],
    blueprint: [
      {
        title: "Practice entity and location model",
        detail:
          "One practice entity. Location pages only where a real operatory exists. Provider pages that reinforce the practice instead of competing with it.",
      },
      {
        title: "Treatment-page indexation",
        detail:
          "Implants, aligners, and emergency visits each get a technically clean URL, appropriate schema, and internal links from location pages without doorway-page patterns.",
      },
      {
        title: "Map pack for new-patient calls",
        detail:
          "Profile categories, appointment links, and review velocity tied to new-patient procedures, with call and form tracking that shows which treatment page produced the consult.",
      },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
