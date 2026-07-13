import { FadeIn } from '@/components/ui/FadeIn';
import SystemWalkthrough from './SystemWalkthrough';

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="container">
        <FadeIn as="header" className="sec-head">
          <div className="sec-eyebrow">
            <span className="num">03</span>
            <span className="lbl">Process</span>
          </div>
          <h2>From messy ideas to <em>business outcomes.</em></h2>
          <p className="sub">
            Five layers between a vague brief and a system in production — each one
            widens the work outward, and I own every one end to end.
          </p>
        </FadeIn>

        <FadeIn>
          <SystemWalkthrough />
        </FadeIn>
      </div>
    </section>
  );
}
