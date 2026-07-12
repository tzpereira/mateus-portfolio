const WORDS = ['Product', 'Architecture', 'Engineering', 'Craft', 'Creativity'];

export default function Marquee() {
  const copy = (key: string) => (
    <div className="mq-copy" key={key}>
      {WORDS.map(word => (
        <span className="mq-item" key={word}>
          {word}
          <i className="mq-dot" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq-track">{copy('a')}{copy('b')}</div>
    </div>
  );
}
