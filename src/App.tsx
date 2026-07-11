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
};

const projects: PortfolioItem[] = [
  {
    name: 'Notch',
    year: 'April 2026 to current',
    description:
      'A cross-platform AI teleprompter with offline voice-following and privacy-first local processing, scaled to 1,500+ trial downloads and 100+ paying users.',
    href: 'https://socia.ae/products/notch/',
  },
  {
    name: 'Modulus',
    year: '2025',
    description:
      'A five-stage agentic data-science workflow that moves from exploratory analysis to model evaluation in under a minute.',
    href: 'https://drive.google.com/file/d/1xOYEo-DMH8QdfTcvBvgSZ-B3VS2OQKn2/view?usp=sharing',
  },
  {
    name: 'UAVMS',
    year: '2025',
    description:
      'Drone identity verification combining computer vision with indoor positioning, 90.5% mAP, and a 50,000+ image dataset.',
    href: 'https://uavms.vercel.app/',
  },
  {
    name: 'F.A.L.C.O.N.',
    year: '2025',
    description:
      'A YOLOv9 flood-mapping pipeline for satellite imagery and faster disaster-response planning.',
    href: 'https://www.canva.com/design/DAGgCawTGH8/reEiSTx2A2L76Y9IYZbNmA/view?utm_content=DAGgCawTGH8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h17cd0e311c',
  },
  {
    name: 'GreenCart',
    year: '2024',
    description:
      'An AI-assisted sustainability scanner that turns product impact into practical shopping decisions.',
    href: 'https://www.youtube.com/watch?v=3I6_HGFMFMQ&feature=youtu.be',
  },
];

const experience: PortfolioItem[] = [
  {
    name: 'Full-Stack AI Developer, KUEC',
    year: 'Jul 2025 to present',
    description:
      'Leading a six-person team building an AI-powered research commercialization platform now in pilot-stage UAT with Khalifa University and ATRC.',
    href: 'https://www.uventure.net/',
  },
  {
    name: 'Co-Founder & COO, Socia',
    year: 'May 2025 to present',
    description:
      'Co-founded and scaled a UAE-based hackathon community and builder network to 1,000+ builders across 70+ colleges, leading partnerships, programs, and events.',
    href: 'https://socia.ae/',
  },
  {
    name: 'Artificial Intelligence Lab Intern, Ab Ovo',
    year: 'May to Jul 2025',
    description:
      'Built retrieval, semantic chunking, and embedding pipelines that turn railway legal documents into real-time B2B insight.',
    href: 'https://github.com/smaffan21/RAG-for-QA-and-BPMN-Generation',
  },
  {
    name: 'Cybersecurity Undergraduate Research Fellow, Khalifa University',
    year: 'Oct 2024 to Feb 2025',
    description:
      'Applied and benchmarked hybrid transformer models for low-latency binary and multi-class intrusion detection.',
  },
  {
    name: 'Software Engineering Intern, Siemens Industrial LLC',
    year: 'Jun to Aug 2024',
    description:
      'Built a Python and JavaScript KPI automation tool that reduced customer-service data-processing time by 80%.',
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

function ItemList({ items }: { items: PortfolioItem[] }) {
  return (
    <ul className="item-list">
      {items.map((item) => (
        <li
          className="item"
          key={item.name}
          tabIndex={item.preview && !item.href ? 0 : undefined}
        >
          <div className="item-heading">
            {item.href ? (
              <a href={item.href} className="item-link">
                {item.name}
              </a>
            ) : (
              <span className="item-name">{item.name}</span>
            )}
            <span className="item-year">{item.year}</span>
          </div>
          <p>
            {item.highlight ? (
              <strong className="item-highlight">{item.highlight}. </strong>
            ) : null}
            {item.description}
          </p>
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

function App() {
  return (
    <>
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

      <div className="page-shell">
        <a className="skip-link" href="#content">
          Skip to content
        </a>

      <header className="site-header">
        <div className="brand-mark" aria-hidden="true">
          <img src="/me.png" alt="" />
        </div>
      </header>

      <main id="content" tabIndex={-1}>
        <section className="intro" aria-labelledby="intro-title">
          <h1 id="intro-title">Hello, I&apos;m Syed Affan.</h1>
          <p className="intro-copy">
            I&apos;m a full-stack AI developer at{' '}
            <a className="intro-link" href="https://www.uventure.net/">KUEC</a>. These days,
            I&apos;m also building{' '}
            <a className="intro-link" href="https://socia.ae/products/notch/">Notch</a>, and
            running <a className="intro-link" href="https://socia.ae/">Socia</a>, on a mission
            to curate the most active builder community in the UAE.
          </p>
          <p className="intro-copy intro-copy-secondary">
            Away from work, I play table tennis, vlog my experiences, and occasionally direct{' '}
            <a className="personal-link" href="https://www.youtube.com/watch?v=U3Dp8hJp2_Y">
              short films
            </a>. I also love hackathons and now host them under{' '}
            <a className="personal-link" href="https://socia.ae/">Socia</a>.
          </p>
        </section>

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
