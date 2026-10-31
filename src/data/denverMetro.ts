export type DenverLocation = {
  slug: string;
  cityName: string;
  county: string;
  neighborhoodHook: string;
};

export const denverMetro: DenverLocation[] = [
  {
    slug: "castle-rock",
    cityName: "Castle Rock",
    county: "Douglas County",
    neighborhoodHook:
      "Homeowners in The Meadows, Terrain, and along Wilcox Street look up a roofer or HVAC crew the morning after a hail cell. The map pack decides who gets the call before the storm chasers do.",
  },
  {
    slug: "boulder",
    cityName: "Boulder",
    county: "Boulder County",
    neighborhoodHook:
      "From Mapleton Hill to Gunbarrel, Boulder buyers compare a contractor the way they compare a trailhead: reviews, proximity, and proof. If the business is missing from the map pack, it is missing from the short list.",
  },
  {
    slug: "aurora",
    cityName: "Aurora",
    county: "Arapahoe County",
    neighborhoodHook:
      "Original Aurora, Saddle Rock, and the E-470 corridor mix emergency plumbing, storm roofing, and turnover HVAC. The crews that rank on a phone own the after-hours jobs.",
  },
  {
    slug: "northglenn",
    cityName: "Northglenn",
    county: "Adams County",
    neighborhoodHook:
      "Northglenn and the Thornton line are call-first markets. A homeowner with a failed furnace or a locked front door taps the top three map results and dials. Rank lower and the lead is already gone.",
  },
  {
    slug: "denver-tech-center",
    cityName: "Denver Tech Center",
    county: "Arapahoe County",
    neighborhoodHook:
      "Property managers in the Denver Tech Center, Greenwood Village, and Inverness hire vendors from Google before a broker makes an introduction. The category page is the proposal.",
  },
];

export function getDenverLocation(slug: string): DenverLocation | undefined {
  return denverMetro.find((location) => location.slug === slug);
}
