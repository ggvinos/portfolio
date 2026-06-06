"use client";

const ROW_A = [
  "Cypress", "Playwright", "Postman", "Appium", "JMeter", "pytest",
  "Python", "JavaScript", "TypeScript", "Pandas", "Streamlit", "Plotly",
  "GitHub Actions", "Jira", "Figma", "Claude API",
];

const ROW_B = [
  "React", "Next.js", "Tailwind CSS", "Git", "Vercel", "REST API",
  "SQL", "Selenium", "qase.io", "TestRail", "Framer", "JWT",
  "CI/CD", "Agile", "Scrum", "JSON Schema",
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-3 w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs px-3 py-1.5 border border-default text-muted bg-surface whitespace-nowrap hover:border-accent hover:text-accent transition-colors duration-150 cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="py-12 bg-page border-b border-default overflow-hidden">
      <div className="space-y-3">
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
      </div>
    </section>
  );
}
