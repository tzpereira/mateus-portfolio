import { FadeIn } from '@/components/ui/FadeIn';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import { IsoLayer } from '@/components/ui/generative/IsoLayer';
import { type LineArtVariant } from '@/components/ui/generative/LineArt';

export default function Depth() {
  const layers: {
    ix: string;
    title: string;
    items: string[];
    art: LineArtVariant;
  }[] = [
    {
      ix: '01',
      title: 'Product & Discovery',
      items: ['Stakeholder alignment', 'Requirements', 'MVP definition', 'UX thinking', 'Prototyping', 'Prioritization'],
      art: 'discovery',
    },
    {
      ix: '02',
      title: 'Solution Architecture',
      items: ['System design', 'Data modeling', 'APIs & services', 'Integrations', 'Scalability', 'Technical trade-offs'],
      art: 'architecture',
    },
    {
      ix: '03',
      title: 'Software Engineering',
      items: ['Backend & frontend', 'Full-stack delivery', 'Cloud', 'Data workflows', 'RAG & LLM features', 'Observability'],
      art: 'engineering',
    },
    {
      ix: '04',
      title: 'Cloud Economics & Scale',
      items: ['Cloud cost architecture', 'Low-cost infrastructure', 'SQL optimization', 'Performance', 'Monitoring', 'Reliability'],
      art: 'scale',
    },
    {
      ix: '05',
      title: 'Security & Trust',
      items: ['Threat modeling', 'Pentest suite (authored)', 'Hardening', 'Audits & compliance', 'Access & secrets', 'On-spec delivery'],
      art: 'security',
    },
  ];

  // Full working range across my projects (Vorax, colplan, Plan Patagonia,
  // Multi Agent Loop, go-kafka-sdk) and mateus_resume.pdf.
  const technologies = [
    // Languages & frameworks
    { name: 'TypeScript' }, { name: 'Node.js' }, { name: 'React' }, { name: 'Next.js' },
    { name: 'Python' }, { name: 'Go' }, { name: 'PHP' },
    // Data
    { name: 'PostgreSQL' }, { name: 'Prisma' }, { name: 'Redis' }, { name: 'Kafka' },
    { name: 'Polars' }, { name: 'Data pipelines' },
    // Cloud & ops
    { name: 'AWS' }, { name: 'Docker' }, { name: 'Kubernetes' }, { name: 'Cloudflare' },
    { name: 'Grafana' }, { name: 'Observability' },
    // AI
    { name: 'LLM APIs' }, { name: 'RAG' }, { name: 'Code agents' }, { name: 'MCP' },
  ];

  return (
    <section className="depth" id="depth">
      <div className="container">
        <FadeIn as="header" className="sec-head">
          <div className="sec-eyebrow">
            <span className="num">01</span>
            <span className="lbl">The range</span>
          </div>
          <h2>I don’t pick a lane. <em>I cover the whole stack.</em></h2>
        </FadeIn>

        <div className="iso-module">
          <StaggerGrid className="iso-stack">
            {layers.map(({ ix, title, items, art }, i) => {
              const side = i % 2 === 0 ? 'left' : 'right';
              const label = (
                <div className="iso-label">
                  <span className="db-ix">{ix}</span>
                  <h3 className="db-title">{title}</h3>
                  <ul className="db-items">
                    {items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              );
              return (
                <StaggerItem className={`iso-layer side-${side}`} key={ix}>
                  <div className="iso-cell iso-cell-l">{side === 'left' && label}</div>
                  <div className="iso-cell iso-cell-c">
                    <IsoLayer variant={art} />
                  </div>
                  <div className="iso-cell iso-cell-r">{side === 'right' && label}</div>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>

        <FadeIn className="depth-feed">
          <span className="df-label">Stack</span>
          <ul className="df-list">
            {technologies.map(({ name }) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
