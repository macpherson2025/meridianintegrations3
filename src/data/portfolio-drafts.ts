/**
 * Prepared portfolio records. Do not import this file from a page, layout,
 * or client component. These entries are hidden until permission, completed
 * work, and an authorized screenshot are all confirmed.
 *
 * When an entry is approved, move a public record into `publishedProjects`
 * in homepage.ts and add a compressed image under public/work/.
 */

export type PortfolioDraft = {
  id: string;
  name: string;
  site: string;
  permission: "pending" | "unverified" | "approved";
  workStatus: "unverified" | "planned" | "completed";
  note: string;
};

export const portfolioDrafts: PortfolioDraft[] = [
  {
    id: "mobile-stress-recovery",
    name: "Mobile Stress Recovery",
    site: "https://mobilestressrecovery.com",
    permission: "pending",
    workStatus: "unverified",
    note: "Client permission is pending. Do not publish the name, address, description, or any screenshot.",
  },
  {
    id: "mile-high-metro-electrician",
    name: "Mile High Metro Electrician",
    site: "https://milehighmetroelectrician.com",
    permission: "unverified",
    workStatus: "unverified",
    note: "No permission record and no authorized screenshot are in this repository.",
  },
  {
    id: "moonstone-construction",
    name: "Moonstone Construction",
    site: "https://moonstoneconstruction.com",
    permission: "unverified",
    workStatus: "planned",
    note: "A redesign has been discussed. It is not completed. Do not describe it as finished work.",
  },
];
