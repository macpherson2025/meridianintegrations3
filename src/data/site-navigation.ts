export type SiteNavLink = {
  href: string;
  label: string;
};

export type SiteNavGroup = {
  label: string;
  items: readonly SiteNavLink[];
};

export const siteNavGroups = [
  {
    label: "Services",
    items: [
      {
        href: "/services/website-design-development",
        label: "Website Design & Development",
      },
      {
        href: "/services/digital-marketing",
        label: "Digital Marketing",
      },
      {
        href: "/services/accessibility",
        label: "Accessibility",
      },
      {
        href: "/services/hosting-maintenance",
        label: "Hosting and Maintenance",
      },
    ],
  },
] as const satisfies readonly SiteNavGroup[];

export const siteNavLinks = [
  { href: "/insights", label: "News + Insights" },
  { href: "/our-story", label: "Our Story" },
] as const satisfies readonly SiteNavLink[];
