import { useEffect, useId, useRef, useState } from 'react';
import Grainient from '@/components/Grainient';

type PortfolioItem = {
  name: string;
  year: string;
  description: string;
  href?: string;
  highlight?: string;
  preview?: {
    src: string;
    alt: string;
  };
  logo?: string;
  logoText?: string;
  details?: string[];
  shots?: {
    src: string;
    alt: string;
    contain?: boolean;
  }[];
};

const projects: PortfolioItem[] = [
  {
    name: 'Notch',
    logo: '/Pictures/projects/notch-logo.png',
    year: 'April 2026 to present',
    description:
      'A workspace for meetings, presentations, and demos: a voice-following teleprompter plus recording, editing, and recaps, with 1,500+ trial downloads and 100+ paying users.',
    href: 'https://trynotch.net/',
    details: [
      'Started as an offline, voice-following teleprompter (Electron, Vosk, TypeScript) and is growing into one connected workspace to prepare for, deliver, record, and revisit meetings, presentations, and demos.',
      'The teleprompter stays the entry point. Writer turns rough notes into a script, screen recording captures the moment, a built-in editor handles auto-zoom, captions, and cuts, and Recap brings back what was said afterwards.',
      'Privacy-first by design: voice-following and processing run locally, with no accounts or cloud dependency.',
      'Built for people whose work is calls and follow-up, such as sales and account teams, customer success, educators, consultants, and team leads, and shaped by 1:1 customer discovery on positioning, UX, pricing, and roadmap.',
      'Launched at a 24-hour virtual sprint run through Socia, then scaled to 1,500+ trial downloads and 100+ paying users.',
    ],
    shots: [
      { src: '/Pictures/projects/notch-home.jpg', alt: 'Notch home screen with teleprompter, writer, recap, and recordings' },
      { src: '/Pictures/projects/notch-editor.jpg', alt: 'Notch video editor with timeline, auto-zoom, and captions' },
      { src: '/Pictures/projects/notch-teleprompter.jpg', alt: 'Notch teleprompter following a speaker’s voice', contain: true },
    ],
  },
  {
    name: 'UVenture',
    logo: '/Pictures/projects/uventure-logo.png',
    year: 'Jul 2025 to present',
    description:
      'A national AI platform that carries university research from invention disclosure to commercialization for five stakeholder groups, now in pilot UAT with Khalifa University and MOHESR.',
    href: 'https://www.uventure.net/',
    details: [
      'Leading a six-person team building a unified platform that moves research from idea and invention disclosure through IP review, industry collaboration, investment, and commercialization for five stakeholder groups.',
      'Own end-to-end product and technical delivery across architecture, development, QA, stakeholder discovery, pilot deployments, and demos, including conversations on multi-university adoption.',
      'Built AI capabilities for document intelligence, semantic search, prior-art support, missing-information detection, research-to-partner matching, and decision-ready reports using retrieval-augmented generation and vector search.',
      'Now in pilot-stage user acceptance testing with Khalifa University and MOHESR.',
    ],
    shots: [
      { src: '/Pictures/projects/uventure-landing.jpg', alt: 'UVenture landing page: From ideas to impact' },
      { src: '/Pictures/projects/uventure-matches.jpg', alt: 'UVenture research matches with similarity, complementarity, and evidence scores' },
      { src: '/Pictures/projects/uventure-equipment.jpg', alt: 'UVenture equipment catalogue for industry partners' },
    ],
  },
  {
    name: 'Modulus',
    logo: '/Pictures/projects/modulus-logo.png',
    year: '2025',
    description:
      'An autonomous data scientist built for the MBZUAI K2 Think hackathon: give it a dataset and a five-stage agentic pipeline plans, codes, tunes, and evaluates a model in under a minute, with reproducible code behind every result.',
    href:
      'https://drive.google.com/file/d/1xOYEo-DMH8QdfTcvBvgSZ-B3VS2OQKn2/view?usp=sharing',
    details: [
      'Developed for the MBZUAI K2 Think hackathon, designing a five-stage agentic workflow (EDA, Plan, Synthesize, Train, Evaluate) coordinated by the K2-Think model.',
      'Optimized the full pipeline to under a minute, including LLM reasoning, a 20-trial Optuna hyperparameter search, and model training.',
      'Built a deterministic code-synthesis engine on Jinja2 templates so every generated ML script is reproducible and auditable.',
      'Streams progress to a Next.js interface over SSE and Redis, and produces an evaluation report and a business dashboard from every run.',
    ],
    shots: [
      { src: '/Pictures/projects/modulus-pipeline.jpg', alt: 'Modulus pipeline progress showing each agent stage updating live' },
      { src: '/Pictures/projects/modulus-report.jpg', alt: 'Modulus model evaluation report with performance metrics' },
      { src: '/Pictures/projects/modulus-dashboard.jpg', alt: 'Modulus machine fleet health dashboard generated from the run' },
    ],
  },
  {
    name: 'Filly',
    logoText: 'F',
    year: 'Coming soon',
    description:
      'A review-first Chrome extension that plans an entire job application in one pass, grounds every answer in your own evidence, and never clicks submit.',
    details: [
      'Matches exact profile values in code, then plans the whole form in one batch as typed actions: text, dropdown, radio, checkbox, file upload, skip, or needs review.',
      'Resolves ambiguous fields against saved evidence and the options actually available on the page, and withholds any answer it cannot support.',
      'Keeps the profile and documents local in IndexedDB, parses resumes into the profile, and never clicks final submit.',
      'Ships with Meaning Find, a companion extension that searches a page by meaning and highlights the original passages.',
      'Covered by 29 automated tests across evidence selection, uncertain choices, and relay security.',
    ],
    shots: [
      { src: '/Pictures/projects/filly-popup.jpg', alt: 'Filly extension popup with Fill action and resume upload' },
    ],
  },
  {
    name: 'CDPCF',
    year: '2026',
    description:
      'A cultural data provenance and compliance framework that protects intangible heritage from unauthorized AI training, placing 2nd at the UN Global SDG Public Policy Innovation Challenge out of 866 teams.',
    details: [
      'Designed a framework for tracing the provenance of cultural data and checking its use against compliance rules, so intangible heritage is not used in AI training without authorization.',
      'Took 2nd place at the UN Global SDG Public Policy Innovation Challenge, representing the UAE in China as the Middle East’s only finalist out of 866 teams.',
    ],
  },
  {
    name: 'UAVMS',
    year: '2025',
    description:
      'Drone identity verification that fuses computer vision with indoor positioning, reaching 90.5% mAP on a 50,000+ image dataset.',
    href: 'https://uavms.vercel.app/',
    details: [
      'Combines computer vision with indoor positioning to verify drone identity.',
      'Reached 90.5% mAP, trained and evaluated on a dataset of more than 50,000 images.',
    ],
  },
  {
    name: 'F.A.L.C.O.N.',
    year: '2025',
    description:
      'A YOLOv9 flood-mapping pipeline that turns satellite imagery into faster disaster-response planning, winning 1st place among 14 teams.',
    href: 'https://www.canva.com/design/DAGgCawTGH8/reEiSTx2A2L76Y9IYZbNmA/view?utm_content=DAGgCawTGH8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h17cd0e311c',
    details: [
      'Built a YOLOv9 pipeline that maps flooded areas from satellite imagery.',
      'Aimed at faster, better-informed disaster-response planning.',
      'Won 1st place among 14 teams at the Zayed University Digital Transformation Hackathon.',
    ],
  },
  {
    name: 'GreenCart',
    year: '2024',
    description:
      'An AI sustainability scanner that turns a product’s environmental impact into a better shopping decision, winning 1st place among 13 teams.',
    href: 'https://www.youtube.com/watch?v=3I6_HGFMFMQ&feature=youtu.be',
    details: [
      'An AI-assisted scanner that turns a product’s environmental impact into a practical shopping decision.',
      'Won 1st place among 13 teams at the Smart Mobile Application Contest.',
    ],
  },
];

const experience: PortfolioItem[] = [
  {
    name: 'Full-Stack AI Developer, KUEC',
    year: 'Jul 2025 to present',
    description:
      'Building AI-native solutions across Khalifa University Enterprises Company, leading product and development from UVenture to internal tooling and client engagements.',
    href: 'https://kuec.ae/',
    details: [
      'Lead product and development for AI-native solutions at KUEC, owning the path from discovery and architecture to build, QA, pilot, and demo.',
      'Flagship work is UVenture, a national research commercialization platform built with a six-person team and now in pilot-stage UAT with Khalifa University and MOHESR.',
      'Build internal tooling that automates and augments the team’s own workflows, and take on client engagements end to end, from requirements through delivery.',
      'Run stakeholder discovery and turn requirements into product, including discussions on multi-university adoption.',
      'Build the AI layer behind these products: document intelligence, semantic search, prior-art support, research-to-partner matching, and decision-ready reports using RAG and vector search.',
    ],
  },
  {
    name: 'Co-Founder & COO, Socia',
    year: 'May 2025 to present',
    description:
      'Co-founded and scaled a UAE-based hackathon community and builder network to 1,000+ builders across 70+ colleges, leading partnerships, programs, and events.',
    href: 'https://socia.ae/',
    details: [
      'Scaled the UAE’s fastest-growing hackathon network to 1,000+ builders across all seven emirates and 100+ institutions.',
      'Closed and manage delivery of an eight-month paid engagement with the National MS Society UAE, building a letter-of-intent and grant management system into their legacy workflows.',
      'Secured partnerships with Replit, 42 Abu Dhabi, and Odoo Middle East DMCC, running discovery calls, proposals, and design.',
      'Ran a five-day Odoo bootcamp, a 250-application buildathon with 42 Abu Dhabi and Replit, and the 24-hour virtual sprint that launched Notch.',
    ],
  },
  {
    name: 'Artificial Intelligence Lab Intern, Ab Ovo',
    year: 'May to Jul 2025',
    description:
      'Built retrieval, semantic chunking, and embedding pipelines that turn railway legal documents into real-time B2B insight.',
    href: 'https://github.com/smaffan21/RAG-for-QA-and-BPMN-Generation',
    details: [
      'Built a RAG pipeline that turns legal documents into real-time B2B insight using vector databases and prompt engineering.',
      'Experimented with instruction tuning and LoRA fine-tuning on Llama 3 variants for railway-domain fidelity.',
      'Implemented semantic chunking and embedding pipelines, testing Hugging Face models along the way.',
    ],
  },
  {
    name: 'Cybersecurity Undergraduate Research Fellow, Khalifa University',
    year: 'Oct 2024 to Feb 2025',
    description:
      'Applied and benchmarked hybrid transformer models for low-latency binary and multi-class intrusion detection.',
    details: [
      'Applied custom transformers to sequence classification on tabular data for low-latency intrusion detection.',
      'Benchmarked hybrid transformer models against GLM, XGBoost, and Random Forest for binary and multi-class classification in vehicular environments.',
      'Led to the HyTEN paper, published at IEEE IWCMC 2026.',
    ],
  },
  {
    name: 'Software Engineering Intern, Siemens Industrial LLC',
    year: 'Jun to Aug 2024',
    description:
      'Built a Python and JavaScript KPI automation tool that cut customer-service data-processing time by 80%.',
    details: [
      'Built a Python and JavaScript KPI automation tool for customer-service data.',
      'Cut data-processing time by 80%.',
    ],
  },
];

const education: PortfolioItem[] = [
  {
    name: 'Khalifa University',
    year: '2021 to 2025',
    description:
      'BSc in Computer Engineering. Graduated with Excellence with Honors.',
  },
];

const recognition: PortfolioItem[] = [
  {
    name: 'UN Global SDG Public Policy Innovation Challenge',
    year: '2026',
    highlight: '2nd place',
    description:
      'Represented the UAE in China as the Middle East\u2019s only finalist, selected from 866 teams and 4,000+ applicants across 100+ countries.',
    preview: {
      src: '/Pictures/un-global-policy-award.jpg',
      alt: 'CDPCF team at the UN Global SDG Public Policy Innovation Challenge in China',
    },
  },
  {
    name: 'Congress of Arabic & Creative Industries',
    year: '2025',
    highlight: '1st place',
    description: 'University category for Baian, selected from 40+ projects.',
    href: 'https://www.linkedin.com/posts/syed-m-affan_aepaesaenaetaepaezaepaes-abudhabi-hackathon-activity-7374321278989549568-ZsmF',
    preview: {
      src: '/Pictures/baian-award.jpeg',
      alt: 'Baian team at the Congress of Arabic and Creative Industries',
    },
  },
  {
    name: "NYUAD Slush'D AI Hackathon",
    year: '2025',
    highlight: '1st place',
    description: 'Among 104 teams for Socia.',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7297498834266394624/',
    preview: {
      src: '/Pictures/nyuad-award.jpg',
      alt: "Socia team at the NYUAD Slush'D AI Hackathon",
    },
  },
  {
    name: 'Zayed University Digital Transformation Hackathon',
    year: '2025',
    highlight: '1st place',
    description: 'Among 14 teams for F.A.L.C.O.N.',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7302690855050448896/',
    preview: {
      src: '/Pictures/zu-award.jpg',
      alt: 'F.A.L.C.O.N. team at the Zayed University Digital Transformation Hackathon',
    },
  },
  {
    name: 'BCG Platinion Middle East Hackathon',
    year: '2024',
    highlight: '1st place',
    description: 'Regional award for Scrap-E, an AI-assisted e-waste recycling concept.',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7271764757626408960/',
    preview: {
      src: '/Pictures/bcg-award.jpeg',
      alt: 'Scrap-E team at the BCG Platinion Middle East Hackathon',
    },
  },
  {
    name: 'Smart Mobile Application Contest',
    year: '2024',
    highlight: '1st place',
    description:
      'Among 13 teams for GreenCart, an AI-powered sustainability scanner for more informed shopping.',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7256537674499416064/',
    preview: {
      src: '/Pictures/smac-award.jpeg',
      alt: 'GreenCart team at the Smart Mobile Application Contest',
    },
  },
  {
    name: '2nd KU Sustainability E-Gaming Competition',
    year: '2024',
    highlight: '3rd place',
    description:
      'Built Eco Warrior Defense, a Scratch game designed to make environmental awareness more engaging.',
  },
  {
    name: 'Emirates Post Group Logistics Unleashed Competition',
    year: '2023',
    highlight: '2nd place',
    description:
      'Prototyped a gravity-fed mail sorting system with machine learning for automated mail processing.',
    preview: {
      src: '/Pictures/epg-award.jpeg',
      alt: 'Team at the Emirates Post Group Logistics Unleashed Competition',
    },
  },
  {
    name: '1st KU Sustainability E-Gaming Competition',
    year: '2023',
    highlight: '3rd place',
    description:
      'Built Recycle Rush, a Unity and C# mobile game that teaches younger audiences about recycling and sustainability.',
    preview: {
      src: '/Pictures/ku-egaming-1-award.jpg',
      alt: 'Recycle Rush award at the first KU Sustainability E-Gaming Competition',
    },
  },
];

const publications: PortfolioItem[] = [
  {
    name: 'HyTEN: A Hybrid Transformer Architecture for Computationally Efficient Intrusion Detection in 6G Vehicular Networks',
    year: '2026',
    description: 'S. M. Affan et al. Published at IEEE IWCMC 2026.',
    href: 'https://doi.org/10.1109/IWCMC69287.2026.11579909',
  },
];

const socialLinks = [
  { label: 'Email', href: 'mailto:smaffan21@gmail.com', icon: 'email' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/syed-m-affan/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/smaffan21/', icon: 'github' },
] as const;

type SocialIconName = (typeof socialLinks)[number]['icon'];

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 9v10M7 5.5v.01M11 19v-6a4 4 0 0 1 8 0v6M11 9v10" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7.5A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1 0S17.9-.4 15 1.5a13.4 13.4 0 0 0-6 0C6.1-.4 4.9 0 4.9 0A5.4 5.4 0 0 0 4.7 3 5.8 5.8 0 0 0 3.2 7c0 5.9 3.5 7.1 6.8 7.5A4.8 4.8 0 0 0 9 18v4" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </svg>
  );
}

type Shot = NonNullable<PortfolioItem['shots']>[number];

function Lightbox({
  shots,
  start,
  onClose,
}: {
  shots: Shot[];
  start: number;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState(start);
  const shot = shots[index];

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const step = (delta: number) =>
    setIndex((value) => Math.min(shots.length - 1, Math.max(0, value + delta)));

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={shot.alt}
      onClose={onClose}
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') step(-1);
        if (event.key === 'ArrowRight') step(1);
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
      }}
    >
      <img src={shot.src} alt={shot.alt} />
    </dialog>
  );
}

function ItemRow({ item }: { item: PortfolioItem }) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const expandable = Boolean(item.details?.length);
  const panelId = useId();

  return (
    <li
      className={`item${expandable ? ' item-expandable' : ''}${open ? ' is-open' : ''}`}
      tabIndex={item.preview && !item.href ? 0 : undefined}
      onClick={
        expandable
          ? (event) => {
              if ((event.target as HTMLElement).closest('a, button')) return;
              setOpen((value) => !value);
            }
          : undefined
      }
    >
      <div className="item-heading">
        <span className="item-title">
          {item.logo ? (
            <img className="item-logo" src={item.logo} alt="" aria-hidden="true" />
          ) : item.logoText ? (
            <span className="item-logo item-logo-text" aria-hidden="true">
              {item.logoText}
            </span>
          ) : null}
          {item.href ? (
            <a href={item.href} className="item-link">
              {item.name}
            </a>
          ) : (
            <span className="item-name">{item.name}</span>
          )}
        </span>
        <span className="item-year">{item.year}</span>
      </div>
      <p>
        {item.highlight ? (
          <strong className="item-highlight">{item.highlight}. </strong>
        ) : null}
        {item.description}
      </p>
      {item.shots ? (
        <div className="item-reveal item-reveal-shots">
          <div className="item-shots" style={{ ['--shots' as string]: item.shots.length }}>
            {item.shots.map((shot, shotIndex) => (
              <button
                type="button"
                className="item-shot"
                key={shot.src}
                aria-label={`Enlarge: ${shot.alt}`}
                onClick={() => setZoomed(shotIndex)}
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className={shot.contain ? 'is-contain' : undefined}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {expandable ? (
        <>
          <div className="item-reveal item-reveal-details" id={panelId}>
            <ul className="item-details">
              {item.details!.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className="item-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Show less' : 'Show details'}
          </button>
        </>
      ) : null}
      {zoomed !== null && item.shots ? (
        <Lightbox shots={item.shots} start={zoomed} onClose={() => setZoomed(null)} />
      ) : null}
      {item.preview ? (
        <img
          className="item-preview"
          src={item.preview.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </li>
  );
}

function ItemList({ items }: { items: PortfolioItem[] }) {
  return (
    <ul className="item-list">
      {items.map((item) => (
        <ItemRow item={item} key={item.name} />
      ))}
    </ul>
  );
}

type SectionIconName = 'projects' | 'work' | 'education' | 'publications' | 'recognition';

function SectionIcon({ name }: { name: SectionIconName }) {
  if (name === 'projects') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="m4.4 7.7 7.6 4.2 7.6-4.2M12 12v9" />
      </svg>
    );
  }

  if (name === 'work') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 8.5V4m0 4.5H8" />
        <path d="M4.8 7.2A8.5 8.5 0 1 1 3.5 12" />
        <path d="M12 7.5V12l3 1.8" />
      </svg>
    );
  }

  if (name === 'education') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 10 9-5 9 5-9 5-9-5Z" />
        <path d="M7 12.5V17c2.7 2 7.3 2 10 0v-4.5M21 10v6" />
      </svg>
    );
  }

  if (name === 'recognition') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M7 8h7M7 11h5" />
        <path d="m16.5 13.5 1 1.6 1.9.4-1.3 1.4.2 1.9-1.8-.8-1.8.8.2-1.9-1.3-1.4 1.9-.4 1-1.6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h9l3 3v15H6V3Z" />
      <path d="M14 3v4h4M9 11h6M9 15h6" />
    </svg>
  );
}

function Section({
  icon,
  title,
  items,
}: {
  icon: SectionIconName;
  title: string;
  items: PortfolioItem[];
}) {
  return (
    <section className="section" aria-labelledby={`section-${icon}`}>
      <div className="section-label">
        <SectionIcon name={icon} />
        <h2 id={`section-${icon}`}>{title}</h2>
      </div>
      <ItemList items={items} />
    </section>
  );
}

const gallery = [
  { n: 1, ratio: 1.333, alt: 'Three friends holding cards at an evening Build It event' },
  { n: 2, ratio: 1.5, alt: 'Presenting on stage at the NYUAD hackathon' },
  { n: 3, ratio: 0.667, alt: 'In conversation during a networking session' },
  { n: 4, ratio: 0.667, alt: 'Outside Etihad Arena in Abu Dhabi' },
  { n: 5, ratio: 1.5, alt: 'A reflection photo outside a university building' },
] as const;

const gallerySlides: Shot[] = gallery.map(({ n, alt }) => ({
  src: `/Pictures/gallery/gallery-${n}-full.webp`,
  alt,
}));

function Gallery() {
  const [zoomed, setZoomed] = useState<number | null>(null);

  return (
    <section className="gallery" aria-label="Photos">
      <ul className="gallery-row">
        {gallery.map(({ n, ratio, alt }, index) => (
          <li key={n} style={{ ['--ratio' as string]: ratio }}>
            <button
              type="button"
              className="gallery-photo"
              aria-label={`Enlarge: ${alt}`}
              onClick={() => setZoomed(index)}
            >
              <img
                src={`/Pictures/gallery/gallery-${n}-480.webp`}
                srcSet={`/Pictures/gallery/gallery-${n}-480.webp 480w, /Pictures/gallery/gallery-${n}-960.webp 960w`}
                sizes="(min-width: 720px) 170px, 46vw"
                width={480}
                height={Math.round(480 / ratio)}
                alt={alt}
                loading="lazy"
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>
      {zoomed !== null ? (
        <Lightbox shots={gallerySlides} start={zoomed} onClose={() => setZoomed(null)} />
      ) : null}
    </section>
  );
}

function Background() {
  return (
    <div className="background-layer" aria-hidden="true">
      <Grainient
        color1="#2c3d52"
        color2="#313131"
        color3="#000000"
        timeSpeed={0}
        colorBalance={-0.58}
        warpStrength={1.6}
        warpFrequency={3.8}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={-44}
        blendSoftness={0.53}
        rotationAmount={500}
        noiseScale={0.8}
        grainAmount={0.05}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1.15}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  );
}

function App() {
  return (
    <>
      <Background />

      <div className="page-shell">
        <a className="skip-link" href="#content">
          Skip to content
        </a>

      <header className="site-header" aria-hidden="true" />

      <main id="content" tabIndex={-1}>
        <section className="intro" aria-labelledby="intro-title">
          <h1 id="intro-title">Hello, I&apos;m Syed M. Affan.</h1>
          <p className="intro-copy">
            I&apos;m a product-facing full-stack AI developer at{' '}
            <a className="intro-link" href="https://kuec.ae/">KUEC</a>. These days,
            I&apos;m also building{' '}
            <a className="intro-link" href="https://trynotch.net/">Notch</a>, and
            running <a className="intro-link" href="https://socia.ae/">Socia</a>, on a mission
            to curate the most active builder community in the UAE.
          </p>
          <p className="intro-copy intro-copy-secondary">
            Away from work, I play table tennis, vlog my experiences, and occasionally direct{' '}
            <a className="personal-link" href="https://www.youtube.com/watch?v=U3Dp8hJp2_Y">
              short films
            </a>. I also love hackathons and now host them under{' '}
            Socia.
          </p>
        </section>

        <Gallery />

        <Section icon="projects" title="Projects" items={projects} />
        <Section icon="work" title="Work" items={experience} />
        <Section icon="education" title="Education" items={education} />
        <Section icon="publications" title="Publications" items={publications} />
        <Section icon="recognition" title="Recognition" items={recognition} />
      </main>

      <footer className="site-footer">
        <p>
          Based in Abu Dhabi. Want to collaborate,{' '}
          <a href="mailto:smaffan21@gmail.com">let’s talk</a>.
        </p>
        <nav className="footer-socials" aria-label="Contact and social links">
          {socialLinks.map((link) => (
            <a href={link.href} key={link.label} aria-label={link.label} title={link.label}>
              <SocialIcon name={link.icon} />
            </a>
          ))}
        </nav>
      </footer>
      </div>
    </>
  );
}

export default App;
