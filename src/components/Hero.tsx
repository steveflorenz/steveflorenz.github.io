import { useEffect, useRef } from "react";
import "./css/Hero.css";

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counters = statsRef.current?.querySelectorAll(".stat-num");
    if (!counters) return;

    const timers: ReturnType<typeof setInterval>[] = [];

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const raw = el.dataset.count ?? "0";
          const target = parseFloat(raw);
          const isDecimal = raw.includes(".");
          let current = 0;
          const step = target / 60;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = (isDecimal ? target.toFixed(1) : target) + "+";
              clearInterval(timer);
              return;
            }
            el.textContent = isDecimal
              ? current.toFixed(1)
              : String(Math.floor(current));
          }, 20);

          timers.push(timer);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((el) => countObserver.observe(el));

    return () => {
      timers.forEach(clearInterval);
      countObserver.disconnect();
    };
  }, []);

  return (
    <section id="hero">
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", position: "relative" }}
      >
        <div className="hero-tag">DEVELOP + SECURE</div>

        <h1 className="hero-name">
          <span className="line1" style={{ fontSize: "70px" }}>
            STEVE FLORENZ
          </span>
          <span className="line2 glitch" data-text="MENDOZA">
            MENDOZA
          </span>
        </h1>

        <p className="hero-title">
          <span className="keyword">
            Development • Configuration • Programming
          </span>
          <br />
          <span className="keyword2">
            Networking • Cybersecurity • Administration
          </span>
        </p>

        <div className="hero-ctas">
          <a href="#projects" className="btn-primary">
            <span>View Projects</span>
          </a>
          <a href="#contact" className="btn-ghost">
            Get In Touch
          </a>
        </div>

        <div className="hero-stats" ref={statsRef}>
          <div>
            <div className="stat-num" data-count="7">
              0
            </div>
            <div className="stat-label">Projects</div>
          </div>
          <div>
            <div className="stat-num" data-count="1.5">
              0
            </div>
            <div className="stat-label">Years Exp.</div>
          </div>
          <div>
            <div className="stat-num" data-count="15">
              0
            </div>
            <div className="stat-label">Tools & Tech</div>
          </div>
          <div>
            <div className="stat-num" data-count="5">
              0
            </div>
            <div className="stat-label">Tech Certs</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
