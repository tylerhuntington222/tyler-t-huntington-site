export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "article" | "software" | "report" | "conference";
  doi?: string;
  url?: string;
};

export const SCHOLAR_PROFILE_URL =
  "https://scholar.google.com/citations?user=jY61hrcAAAAJ&hl=en";

/** Publications listed on Google Scholar, sorted by year (newest first). */
export const publications: Publication[] = [
  {
    title: "California Bioscape Frontend",
    authors: "T Huntington",
    venue: "Zenodo",
    year: 2026,
    type: "software",
    doi: "10.5281/zenodo.19443410",
  },
  {
    title: "CA-BioSiting: Backend Data Platform",
    authors: "L Setiawan, V Rajpura, N Burggraf, M Gong, P Smith, T Huntington, A Wong",
    venue: "Zenodo",
    year: 2026,
    type: "software",
    doi: "10.5281/zenodo.19443582",
  },
  {
    title:
      "Controlled Environment Agriculture SiteScout (CEA SiteScout) v1.0",
    authors: "J Stokes-Draut, R Negron-Juarez, T Huntington, A Hodson",
    venue: "U.S. Department of Energy Software",
    year: 2025,
    type: "software",
    doi: "10.11578/dc.20250919.4",
  },
  {
    title:
      "Impact of Drought Stress on Sorghum bicolor Yield, Deconstruction, and Microbial Conversion Determined in a Feedstocks-to-Fuels Pipeline",
    authors:
      "JC Dalton, T Huntington, V Pidatala, M Lei, C Hill, J Angeles, D Putnam, et al.",
    venue: "ACS Sustainable Chemistry & Engineering",
    year: 2024,
    type: "article",
    doi: "10.1021/acssuschemeng.4c05826",
  },
  {
    title: "Paths to circularity for plastics in the United States",
    authors:
      "TP Hendrickson, B Bose, N Vora, T Huntington, SL Nordahl, BA Helms, et al.",
    venue: "One Earth",
    year: 2024,
    type: "article",
    doi: "10.1016/j.oneear.2024.02.005",
  },
  {
    title: "BioSiting Tool (BioSiting) v2",
    authors:
      "T Huntington, C Scown, H Breunig, O Kavvada, X Cui, T Hendrickson, et al.",
    venue: "Scientific software",
    year: 2024,
    type: "software",
    doi: "10.11578/dc.20240815.9",
  },
  {
    title: "BioC2G Tool v1",
    authors: "T Huntington, C Scown, O Kavvada, S Nordahl, NR Baral",
    venue: "Scientific software",
    year: 2024,
    type: "software",
    doi: "10.11578/dc.20240815.8",
  },
  {
    title:
      "The Value of Sharing and Consolidating Critical Community, Electricity, and Natural Hazard Information",
    authors: "C Sparti, PH Larsen, T Huntington",
    venue: "Technical report",
    year: 2023,
    type: "report",
    url: "https://www.cpuc.ca.gov/-/media/cpuc-website/divisions/energy-division/documents/resiliency-and-microgrids/resiliency-and-microgrids-events-and-materials/lbnldoe-data-sharing-reportaug20.pdf",
  },
  {
    title: "Machine learning for surrogate process models of bioproduction pathways",
    authors: "T Huntington, NR Baral, M Yang, E Sundstrom, C Scown",
    venue: "Bioresource Technology",
    year: 2023,
    type: "article",
    doi: "10.1016/j.biortech.2022.128528",
  },
  {
    title:
      "A systematic method for selecting molecular descriptors as features when training models for predicting physiochemical properties",
    authors: "AE Comesana, TT Huntington, C Scown, KE Niemeyer, VH Rapp",
    venue: "Fuel",
    year: 2022,
    type: "article",
    doi: "10.1016/j.fuel.2022.123836",
  },
  {
    title: "Feedstock to Function tool property models",
    authors: "AE Comesana, TT Huntington, CD Scown, KE Niemeyer, VH Rapp",
    venue: "Zenodo",
    year: 2022,
    type: "software",
    doi: "10.5281/zenodo.6383369",
  },
  {
    title: "Technoeconomic analysis for biofuels and bioproducts",
    authors: "CD Scown, NR Baral, M Yang, N Vora, T Huntington",
    venue: "Current Opinion in Biotechnology",
    year: 2021,
    type: "article",
    doi: "10.1016/j.copbio.2021.01.002",
  },
  {
    title:
      "Tree-based automated machine learning to predict biogas production for anaerobic co-digestion of organic waste",
    authors: "Y Wang, T Huntington, CD Scown",
    venue: "ACS Sustainable Chemistry & Engineering",
    year: 2021,
    type: "article",
    doi: "10.1021/acssuschemeng.1c04612",
  },
  {
    title:
      "Machine learning to predict biomass sorghum yields under future climate scenarios",
    authors: "T Huntington, X Cui, U Mishra, CD Scown",
    venue: "Biofuels, Bioproducts and Biorefining",
    year: 2020,
    type: "article",
    doi: "10.1002/bbb.2087",
  },
  {
    title: "Smelly-Odor Webtool (Smelly) v1",
    authors: "L Jin, C Scown, T Ho, T Huntington, W Zhou",
    venue: "Scientific software",
    year: 2020,
    type: "software",
    doi: "10.11578/dc.20210521.1",
  },
  {
    title:
      "Paths to Sustainable Distributed Generation through 2050: Matching Local Waste Biomass Resources with Grid, Industrial, and Community Needs",
    authors:
      "C Scown, A Robinson, H Breunig, L Jin, T Huntington, S Smith, J Devkota, et al.",
    venue: "Technical report",
    year: 2019,
    type: "report",
    doi: "10.2172/1616177",
  },
  {
    title: "Can machine learning predict fuel properties accurately?",
    authors: "MA Mayer, T Huntington, A Comesana, VH Rapp, K Niemeyer",
    venue: "WSSCI Fall Technical Meeting",
    year: 2019,
    type: "conference",
    url: "https://escholarship.org/uc/item/9n26f9t8",
  },
  {
    title:
      "Machine Learning to Predict Bioenergy Sorghum Yields under Future Climate Scenarios",
    authors: "CD Scown, T Huntington, X Cui, U Mishra",
    venue: "AGU Fall Meeting Abstracts",
    year: 2019,
    type: "conference",
    url: "https://ui.adsabs.harvard.edu/abs/2019AGUFMGC41H1248S/abstract",
  },
  {
    title: "Biositing Webtool, v1",
    authors: "C Scown, H Breunig, O Kavvada, T Huntington",
    venue: "Scientific software",
    year: 2019,
    type: "software",
    doi: "10.11578/dc.20191029.4",
  },
  {
    title: "Temporal and geographic drivers of biomass residues in California",
    authors: "HM Breunig, T Huntington, L Jin, A Robinson, CD Scown",
    venue: "Resources, Conservation and Recycling",
    year: 2018,
    type: "article",
    doi: "10.1016/j.resconrec.2018.08.022",
  },
  {
    title:
      "Strategies for near-term scale-up of cellulosic biofuel production using sorghum and crop residues in the US",
    authors: "X Cui, O Kavvada, T Huntington, CD Scown",
    venue: "Environmental Research Letters",
    year: 2018,
    type: "article",
    doi: "10.1088/1748-9326/aae6e3",
  },
  {
    title:
      "Dynamic geospatial modeling of the building stock to project urban energy demand",
    authors: "HM Breunig, T Huntington, L Jin, A Robinson, CD Scown",
    venue: "Environmental Science & Technology",
    year: 2018,
    type: "article",
    doi: "10.1021/acs.est.8b00435",
  },
];

export const publicationTypeLabel: Record<Publication["type"], string> = {
  article: "Article",
  software: "Software",
  report: "Report",
  conference: "Conference",
};

const authorNamePattern = /\bT{1,2} Huntington\b/g;

export function getPublicationUrl(publication: Publication): string | undefined {
  if (publication.doi) {
    return `https://doi.org/${publication.doi}`;
  }
  return publication.url;
}

/** Split an author string into segments, marking Tyler's name for emphasis. */
export function splitAuthorsWithHighlight(
  authors: string,
): { text: string; isSelf: boolean }[] {
  const parts: { text: string; isSelf: boolean }[] = [];
  let lastIndex = 0;

  for (const match of authors.matchAll(authorNamePattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({ text: authors.slice(lastIndex, index), isSelf: false });
    }
    parts.push({ text: match[0], isSelf: true });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < authors.length) {
    parts.push({ text: authors.slice(lastIndex), isSelf: false });
  }

  return parts.length > 0 ? parts : [{ text: authors, isSelf: false }];
}
