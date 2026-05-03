import './css/About.css'
import { useEffect, useRef } from 'react'

const skills = [
  { name: "Linux Systems", level: 89 },
  { name: "Front-end", level: 75 },
  { name: "Back-end", level: 53 },
  { name: "Cloud / DevSecOps", level: 74 },
];

const SkillBars = () => {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = barsRef.current?.querySelectorAll('.progress-fill');
    if (!bars) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = e.target as HTMLElement;
          target.style.width = target.dataset.width + '%';
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.3 });
    
    const timeout = setTimeout(() => {
      bars.forEach(bar => observer.observe(bar));
    }, 100);

    return () => {
        observer.disconnect();
        clearTimeout(timeout);
    };
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