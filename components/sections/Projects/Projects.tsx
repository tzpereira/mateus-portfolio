import { FadeIn } from '@/components/ui/FadeIn';

type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  name: string;
  kind: string;
  area: string;
  intent: string;
  stack: string[];
  href?: string;
  linkLabel?: string;
  links?: ProjectLink[];
  repo?: string;
  note?: string;
};

const projects: Project[] = [
  {
    name: 'Workflow Execution Engine',
    kind: 'Open source · MVP · M1.3/M1.15',
    area: 'Engineering platform',
    intent: 'Engineering processes live in docs and people’s heads. WEE turns well-defined workflows into versioned, replayable, budgeted pipelines — built for execution, not discovery: clear workflows produce reliable outcomes. The engine owns the loops, not the model, and reinforces harness-style engineering at every step. Workflows are software; LLMs are an implementation detail.',
    stack: ['Go', 'TypeScript', 'JSON Schema', 'LLM APIs'],
    repo: 'tzpereira/workflow-execution-engine',
    links: [
      { label: 'GitHub', href: 'https://github.com/tzpereira/workflow-execution-engine' },
      { label: 'Architecture', href: 'https://github.com/tzpereira/workflow-execution-engine/blob/main/docs/ARCHITECTURE.md' },
      { label: 'ADRs', href: 'https://github.com/tzpereira/workflow-execution-engine/tree/main/docs/adr' },
      { label: 'Vision', href: 'https://github.com/tzpereira/workflow-execution-engine/blob/main/docs/VISION.md' },
    ],
  },
  {
    name: 'Plan Patagonia',
    kind: 'Co-founder · 0→1',
    area: 'Travel tech',
    intent: 'Planning a Patagonia trek means stitching together forums, stale blogs and guesswork. Plan Patagonia turns that into one reliable place to decide — I co-founded the company and built the entire platform, from architecture and AI integrations to SEO and launch.',
    stack: ['TypeScript', 'Next.js', 'Prisma', 'Neon Postgres', 'Claude API'],
    href: 'https://planpatagonia.com/',
    linkLabel: 'Visit site',
    note: 'Launching Aug 2026',
  },
  {
    name: 'go-kafka-sdk',
    kind: 'Open source',
    area: 'Backend tooling',
    intent: 'Every service that touches Kafka re-implements the same connection, retry and error handling — each with its own subtle bugs. This SDK packages those patterns once, safe by default, so Go services ship events instead of plumbing.',
    stack: ['Go', 'Apache Kafka'],
    href: 'https://github.com/tzpereira/go-kafka-sdk',
    repo: 'tzpereira/go-kafka-sdk',
  },
  {
    name: 'bandit-brain',
    kind: 'Open source',
    area: 'Machine learning',
    intent: 'A/B tests keep feeding traffic to losing variants while they wait for significance. bandit-brain shifts traffic toward winners in real time — a pure decision engine kept separate from API and storage, so the math stays testable.',
    stack: ['Python', 'Multi-armed bandits'],
    href: 'https://github.com/tzpereira/bandit-brain',
    repo: 'tzpereira/bandit-brain',
  },
];

async function lastCommit(repo: string): Promise<string | undefined> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : undefined,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return undefined;
    const { pushed_at } = await res.json();
    if (!pushed_at) return undefined;
    const d = new Date(pushed_at);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      ...(d.getFullYear() === new Date().getFullYear() ? {} : { year: 'numeric' }),
    });
  } catch {
    return undefined;
  }
}

export default async function Projects() {
  const commits = await Promise.all(
    projects.map(p => (p.repo ? lastCommit(p.repo) : Promise.resolve(undefined)))
  );

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
          {projects.map(({ name, kind, area, intent, stack, href, linkLabel, links, note }, i) => {
            const label = linkLabel ?? 'GitHub';
            const pulse = note ?? (commits[i] && `Last commit ${commits[i]}`);
            const arrow = (
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 11L11 3M5 3h6v6" />
              </svg>
            );
            const body = (
              <div className="ac-body">
                <div className="ac-meta">
                  <span>{kind}</span>
                  <span>{area}</span>
                  {pulse && <span className="ac-pulse">{pulse}</span>}
                </div>
                <h3>{name}</h3>
                <p className="ac-dek">{intent}</p>
                <div className="proj-stack">
                  {stack.map(t => <span className="t" key={t}>{t}</span>)}
                </div>
                {links ? (
                  <div className="ac-links">
                    {links.map(l => (
                      <a className="ac-read" key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${name} — ${l.label}`}>
                        {l.label}
                        {arrow}
                      </a>
                    ))}
                  </div>
                ) : href ? (
                  <span className="ac-read">
                    {label}
                    {arrow}
                  </span>
                ) : null}
              </div>
            );
            return (
              <FadeIn as="article" className="article-card" key={name}>
                {!links && href ? (
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
