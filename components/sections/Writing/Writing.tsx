import Link from 'next/link';
import { FadeIn } from '@/components/ui/FadeIn';

type Article = {
  slug: string;
  kind: string;
  year: string;
  title: string;
  dek: string;
};

const articles: Article[] = [
  {
    slug: 'artificial-intelligence-and-human-vanity',
    kind: 'Essay',
    year: '2026',
    title: "AI Didn’t Replace Our Intelligence. It Challenged Our Self-Importance.",
    dek: 'Answers have become abundant. Abundance is not the same as meaning.',
  },
];

export default function Writing() {
  return (
    <section className="writing" id="writing">
      <div className="container">
        <FadeIn as="header" className="sec-head">
          <div className="sec-eyebrow">
            <span className="num">05</span>
            <span className="lbl">Writing</span>
          </div>
          <h2>Thinking, <em>out loud.</em></h2>
          <p className="sub">
            Where I work things out — on technology, craft, and what stays human.
          </p>
        </FadeIn>

        <div className="writing-list">
          {articles.map(({ slug, kind, year, title, dek }) => (
            <FadeIn as="article" className="article-card" key={slug}>
              <Link className="ac-link" href={`/writing/${slug}`} aria-label={`Read: ${title}`}>
                <div className="ac-body">
                  <div className="ac-meta">
                    <span>{kind}</span>
                    <span>{year}</span>
                  </div>
                  <h3>{title}</h3>
                  <p className="ac-dek">{dek}</p>
                  <span className="ac-read">
                    Read <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
