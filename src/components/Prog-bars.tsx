import './css/About.css'
import { useEffect, useRef } from 'react'

const skills = [
  { name: "Linux Systems", level: 89 },
  { name: "Front-end", level: 75 },
  { name: "Back-end", level: 53 },
  { name: "Cloud / DevSecOps", level: 74 },
  { name: "APIs", level: 50 },
];

const SkillBars = () => {
  const barsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const container = barsRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const bars = container.querySelectorAll<HTMLElement>('.progress-fill');
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width + '%';
          }, i * 100);
        });
        observer.unobserve(container);
      }
    }, { threshold: 0.1 });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skills-bars" ref={barsRef} style={{ marginTop: 24 }}>
      {skills.map((skill) => (
        <div key={skill.name} style={{ marginBottom: 12 }}>
          <div style={headerStyle}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{skill.name}</span>
            <span style={labelStyle}>{skill.level}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" data-width={skill.level} />
          </div>
        </div>
      ))}
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const labelStyle: React.CSSProperties = {
  fontFamily: '"Space Mono",monospace',
  fontSize: 10,
  color: "var(--accent)"
};

export default SkillBars;