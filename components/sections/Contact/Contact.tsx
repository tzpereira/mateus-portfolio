import { FadeIn } from '@/components/ui/FadeIn';

export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="topo-bg" aria-hidden="true" />
      <div className="container contact-inner">
        <FadeIn as="header" className="sec-head" style={{ marginBottom: '48px' }}>
          <div className="sec-eyebrow">
            <span className="num">06</span>
            <span className="lbl">Work with me</span>
          </div>
        </FadeIn>

        <div className="contact-grid">
          <FadeIn>
            <p className="contact-statement" id="contact-heading">
              Need someone who can turn ambiguity into products that <em>survive real usage?</em>
            </p>
            <p className="contact-lead">
              From discovery and architecture to implementation and production.
              One engineer. End-to-end ownership.
            </p>
            <div className="contact-ctas">
              <a className="btn-primary" href="mailto:mateuspdasilva369@gmail.com">
                Let&apos;s talk
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </a>
              <a className="btn-ghost" href="/assets/files/mateus_resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 11L11 3M5 3h6v6" />
                </svg>
              </a>
              <a className="btn-ghost" href="https://www.linkedin.com/in/mateuspdasilva" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)">
                LinkedIn
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 11L11 3M5 3h6v6" />
                </svg>
              </a>
              <a className="btn-ghost" href="https://github.com/tzpereira" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)">
                GitHub
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 11L11 3M5 3h6v6" />
                </svg>
              </a>
            </div>
          </FadeIn>

          <FadeIn className="contact-meta" delay={0.1}>
            <div className="cm-block">
              <div className="cmk">Best fit</div>
              <div className="opp">
                <span>Early-stage products</span>
                <span>Founding engineer roles</span>
                <span>Product-heavy engineering</span>
                <span>AI-enabled products</span>
                <span>Complex business workflows</span>
              </div>
            </div>
            <div className="cm-block">
              <div className="cmk">Email</div>
              <div className="cmv">
                <a href="mailto:mateuspdasilva369@gmail.com">mateuspdasilva369@gmail.com</a>
              </div>
            </div>
            <div className="cm-block">
              <div className="cmk">Languages</div>
              <div className="cmv">English · Spanish · Portuguese</div>
            </div>
            <div className="cm-block">
              <div className="cmk">Résumé</div>
              <div className="cmv">
                <a href="/assets/files/mateus_resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Download résumé PDF (opens in new tab)">
                  Download PDF ↗
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
