import { FadeIn } from '@/components/ui/FadeIn';

type Project = {
  name: string;
  kind: string;
  area: string;
  intent: string;
  stack: string[];
  href?: string;
  linkLabel?: string;
};

const projects: Project[] = [
  {
    name: 'Workflow Execution Engine',
    kind: 'Open source · In development',
    area: 'AI orchestration',
    intent: 'Runs teams of LLM agents against real tasks — coordinated tool use and hand-offs, built to be observed and trusted in production.',
    stack: ['Go', 'Python', 'LLM APIs', 'AWS', 'Docker'],
    href: 'https://github.com/tzpereira/workflow-execution-engine',
  },
  {
    name: 'Plan Patagonia',
    kind: 'Co-founder · 0→1',
    area: 'Travel tech',
    intent: 'US-registered travel-tech company I co-founded — architected and built the entire platform from zero to launch: product engineering, AI integrations, SEO infrastructure and business strategy.',
    stack: ['TypeScript', 'Next.js', 'Prisma', 'Neon Postgres', 'Claude API'],
    href: 'https://planpatagonia.com/',
    linkLabel: 'Visit site',
  },
  {
    name: 'go-kafka-sdk',
    kind: 'Open source',
    area: 'Backend tooling',
    intent: 'Public Go SDK that simplifies Kafka producer/consumer patterns — abstractions for connection handling, retries and message processing.',
    stack: ['Go', 'Apache Kafka'],
    href: 'https://github.com/tzpereira/go-kafka-sdk',
  },
  {
    name: 'bandit-brain',
    kind: 'Open source',
    area: 'Machine learning',
    intent: 'Multi-armed bandits that optimize experiments and recommend the winning variant in real time.',
    stack: ['Python', 'Multi-armed bandits'],
    href: 'https://github.com/tzpereira/bandit-brain',
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <FadeIn as="header" className="sec-head">
          <div className="sec-eyebrow">
            <span className="num">02</span>
            <span className="lbl">Projects</span>
          </div>
          <h2>What I’m building <em>right now.</em></h2>
        </FadeIn>

        <div className="writing-list">
          {projects.map(({ name, kind, area, intent, stack, href, linkLabel }) => {
            const label = linkLabel ?? 'GitHub';
            const body = (
              <div className="ac-body">
                <div className="ac-meta">
                  <span>{kind}</span>
                  <span>{area}</span>
                </div>
                <h3>{name}</h3>
                <p className="ac-dek">{intent}</p>
                <div className="proj-stack">
                  {stack.map(t => <span className="t" key={t}>{t}</span>)}
                </div>
                {href && (
                  <span className="ac-read">
                    {label}
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 11L11 3M5 3h6v6" />
                    </svg>
                  </span>
                )}
              </div>
            );
            return (
              <FadeIn as="article" className="article-card" key={name}>
                {href ? (
                  <a className="ac-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} — ${label}`}>
                    {body}
                  </a>
                ) : (
                  body
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
