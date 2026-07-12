import { FadeIn } from '@/components/ui/FadeIn';

type Project = {
  name: string;
  kind: string;
  area: string;
  intent: string;
  stack: string[];
  href?: string;
};

const projects: Project[] = [
  {
    name: 'Multi Agent Loop',
    kind: 'Open source · In development',
    area: 'AI orchestration',
    intent: 'Multi-agent orchestration system for autonomous task execution — agent coordination, tool use, memory and observability, designed for production patterns.',
    stack: ['Go', 'Python', 'LLM APIs', 'Kubernetes', 'Docker'],
  },
  {
    name: 'Plan Patagonia',
    kind: 'Co-founder · 0→1',
    area: 'Travel tech',
    intent: 'US-registered travel-tech company I co-founded — architected and built the entire platform from zero to launch: product engineering, AI integrations, SEO infrastructure and business strategy.',
    stack: ['TypeScript', 'Next.js', 'Prisma', 'Neon Postgres', 'Claude API'],
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
          <h2>Building, <em>in the open.</em></h2>
        </FadeIn>

        <div className="writing-list">
          {projects.map(({ name, kind, area, intent, stack, href }) => {
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
                    GitHub <span aria-hidden="true">↗</span>
                  </span>
                )}
              </div>
            );
            return (
              <FadeIn as="article" className="article-card" key={name}>
                {href ? (
                  <a className="ac-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on GitHub`}>
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
