export type CaseStudy = {
  slug: string;
  name: string;
  year: string;
  summary: string;
  overview: string[];
  highlights: string[];
  externalHref?: string;
  externalLabel?: string;
};

const siteUrl = 'https://syed-affan.com';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'notch',
    name: 'Notch',
    year: 'April 2026 to present',
    summary:
      'A cross-platform AI teleprompter with offline voice-following and privacy-first local processing.',
    overview: [
      'Notch helps creators deliver naturally while keeping their script aligned with their speech. Its voice-following works offline, so the core experience remains responsive without sending spoken content to the cloud.',
      'I am building the product through Socia, spanning the application experience, AI behavior, reliability, and the systems needed to turn early interest into a sustainable product.',
    ],
    highlights: [
      '1,500+ trial downloads',
      '100+ paying users',
      'Offline voice-following',
      'Privacy-first local processing',
    ],
    externalHref: 'https://socia.ae/products/notch/',
    externalLabel: 'Visit Notch',
  },
  {
    slug: 'cdpcf',
    name: 'CDPCF',
    year: '2026',
    summary:
      'A Cultural Data Provenance & Compliance Framework designed to protect intangible heritage from unauthorized use in AI training.',
    overview: [
      'CDPCF uses Nabati poetry as a case study for a wider policy problem: communities currently have limited ways to define how intangible cultural heritage may be collected, transformed, and reused as AI training data.',
      'The framework proposes a practical governance layer for provenance, authorization, and usage conditions, helping cultural custodians retain a voice after heritage enters digital datasets.',
    ],
    highlights: [
      '2nd place worldwide at the Global Development Public Policy Youth Innovation Contest',
      'The only finalist team from the Middle East',
      'Selected from 866 teams and 4,000+ applicants across 100+ countries',
      'Represented the UAE at the on-site final in China',
    ],
  },
  {
    slug: 'modulus',
    name: 'Modulus',
    year: '2025',
    summary:
      'A five-stage agentic data-science workflow that moves from exploratory analysis to model evaluation in under a minute.',
    overview: [
      'Modulus organizes common data-science work into a guided agentic workflow: understanding the data, exploring patterns, preparing features, training models, and evaluating results.',
      'The project focuses on compressing the time between receiving a dataset and reaching an evidence-backed model comparison, while keeping each stage understandable to the person using it.',
    ],
    highlights: [
      'Five connected analysis and modelling stages',
      'Exploratory analysis through model evaluation in under a minute',
      'Designed for fast, interpretable experimentation',
    ],
    externalHref:
      'https://drive.google.com/file/d/1xOYEo-DMH8QdfTcvBvgSZ-B3VS2OQKn2/view?usp=sharing',
    externalLabel: 'View the Modulus demo',
  },
  {
    slug: 'uavms',
    name: 'UAVMS',
    year: '2025',
    summary:
      'A drone identity-verification system combining computer vision with indoor positioning.',
    overview: [
      'UAVMS explores how drones can be identified and verified in environments where conventional positioning alone is not enough. It combines a computer-vision pipeline with indoor positioning to support dependable identity checks.',
      'The work included assembling a large image dataset and evaluating the detection model against measurable performance targets rather than relying only on a prototype demonstration.',
    ],
    highlights: [
      '90.5% mean average precision',
      '50,000+ image dataset',
      'Computer vision combined with indoor positioning',
    ],
    externalHref: 'https://uavms.vercel.app/',
    externalLabel: 'Visit UAVMS',
  },
];

export const caseStudyRoutes = caseStudies.map((study) => `/projects/${study.slug}/`);

export function getCaseStudy(pathname: string) {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return caseStudies.find((study) => normalizedPath === `/projects/${study.slug}/`);
}

const person = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Syed M. Affan',
  alternateName: 'Syed Affan',
  url: `${siteUrl}/`,
  image: `${siteUrl}/me.png`,
  email: 'mailto:smaffan21@gmail.com',
  jobTitle: 'Full-Stack AI Developer',
  homeLocation: {
    '@type': 'Place',
    name: 'Abu Dhabi, United Arab Emirates',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Khalifa University Enterprises Company',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Khalifa University',
  },
  sameAs: [
    'https://www.linkedin.com/in/syed-m-affan/',
    'https://github.com/smaffan21/',
  ],
  knowsAbout: [
    'Artificial intelligence',
    'Full-stack development',
    'Retrieval-augmented generation',
    'Machine learning',
    'AI product development',
  ],
};

export type RouteSeo = {
  title: string;
  description: string;
  canonical: string;
  structuredData: object;
};

export function getRouteSeo(pathname: string): RouteSeo {
  const study = getCaseStudy(pathname);

  if (study) {
    const canonical = `${siteUrl}/projects/${study.slug}/`;
    return {
      title: `${study.name} — Project by Syed M. Affan`,
      description: `${study.summary} A project by full-stack AI developer Syed M. Affan.`,
      canonical,
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          person,
          {
            '@type': 'CreativeWork',
            '@id': `${canonical}#project`,
            name: study.name,
            description: study.summary,
            url: canonical,
            dateCreated: study.year.slice(0, 4),
            creator: { '@id': `${siteUrl}/#person` },
            mainEntityOfPage: canonical,
            ...(study.externalHref ? { sameAs: study.externalHref } : {}),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Syed M. Affan',
                item: `${siteUrl}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: study.name,
                item: canonical,
              },
            ],
          },
        ],
      },
    };
  }

  const description =
    'Syed M. Affan is a full-stack AI developer in Abu Dhabi building applied AI products including Notch, Modulus, UAVMS, and CDPCF.';

  return {
    title: 'Syed M. Affan — Full-Stack AI Developer in Abu Dhabi',
    description,
    canonical: `${siteUrl}/`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: `${siteUrl}/`,
          name: 'Syed M. Affan',
          alternateName: 'Syed Affan',
          publisher: { '@id': `${siteUrl}/#person` },
        },
        {
          '@type': 'ProfilePage',
          '@id': `${siteUrl}/#profile`,
          url: `${siteUrl}/`,
          name: 'Syed M. Affan — Full-Stack AI Developer in Abu Dhabi',
          description,
          dateModified: '2026-08-14',
          mainEntity: { '@id': `${siteUrl}/#person` },
        },
        person,
        {
          '@type': 'ScholarlyArticle',
          '@id': 'https://doi.org/10.1109/IWCMC69287.2026.11579909',
          name: 'HyTEN: A Hybrid Transformer Architecture for Computationally Efficient Intrusion Detection in 6G Vehicular Networks',
          url: 'https://doi.org/10.1109/IWCMC69287.2026.11579909',
          datePublished: '2026',
          author: { '@id': `${siteUrl}/#person` },
          publisher: { '@type': 'Organization', name: 'IEEE' },
          isPartOf: { '@type': 'CreativeWork', name: 'IEEE IWCMC 2026' },
        },
      ],
    },
  };
}
