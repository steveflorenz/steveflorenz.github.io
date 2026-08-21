import { useEffect, useRef } from "react";
import "./css/About.css";
import CV from "../assets/CVs/Steve_Florenz_Mendoza_CV.pdf";
import SkillBars from "./Prog-bars";

const About = () => {
  const clockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateClock = () => {
      if (!clockRef.current) return;
      const now = new Date();
      clockRef.current.textContent = now.toLocaleTimeString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
    };

    const interval = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about">
      <div className="about-inner">
        <div className="reveal">
          <div className="section-label">About Me</div>
          <h2 className="section-title">
            Code +
            <br />
            <em>Security</em>
          </h2>
          <p className="about-text">
            I’m an IT professional with hands-on experience in systems
            administration, network infrastructure, and security-focused
            technologies. My work involves managing and maintaining mixed
            environments across Windows, macOS, and Linux systems while ensuring
            reliability, security, and operational efficiency. With a background
            in computer science, I’ve developed practical skills in
            troubleshooting, infrastructure deployment, and system integration.
            I’ve worked on projects involving surveillance systems, network
            configuration, endpoint management, and server environments, helping
            organizations maintain stable and secure IT operations.
          </p>
          <p className="about-text">
            Alongside my professional experience, I’m continuously expanding my
            knowledge in cybersecurity. I enjoy exploring system
            vulnerabilities, learning both offensive and defensive security
            practices, and understanding how technologies interact at both the
            software and network levels. I’m particularly interested in areas
            such as infrastructure security, system hardening, and monitoring
            solutions that help organizations detect and respond to threats
            effectively. Outside of technical work, I enjoy building small
            projects, experimenting with tools, and documenting what I learn
            along the way.
          </p>
          <a
            href={CV}
            className="btn-primary"
            style={{ textDecoration: "none", display: "inline-block" }}
            download="Steve_Florenz_Mendoza_CV.pdf"
          >
            <span>Download CV</span>
          </a>
        </div>
        <div className="reveal" style={{ transitionDelay: "0.2s" }}>
          <div className="code-panel">
            <div className="code-panel-header">
              <span>●</span> session.sh
              <span
                ref={clockRef}
                style={{ marginLeft: "auto", color: "var(--accent4)" }}
              >
                --
              </span>
            </div>
            <div className="code-panel-body">
              <div className="code-line">
                <span>
                  <span className="kw">prof@steve</span>:
                  <span className="ty">~</span>
                  <span className="str">$</span> whoami --details
                </span>
              </div>
              <div className="code-line">
                <span>{"{"}</span>
              </div>
              <div className="code-line">
                <span>
                  {" "}
                  <span className="kw">user</span>:{" "}
                  <span className="str">"Steve Florenz"</span>,
                </span>
              </div>
              <div className="code-line">
                <span>
                  {" "}
                  <span className="kw">roles</span>: [
                </span>
              </div>
              <div className="code-line">
                <span>
                  {" "}
                  <span className="str">"Network &amp; System Admin"</span> (Jun
                  2025 - present),
                </span>
              </div>
              <div className="code-line">
                <span>
                  {" "}
                  <span className="str">"IT Specialist"</span> (Aug 2024 - Jun
                  2025)
                </span>
              </div>
              <div className="code-line">
                <span> ],</span>
              </div>
              <div className="code-line">
                <span>
                  {" "}
                  <span className="kw">status</span>:{" "}
                  <span className="ty">Active</span>,
                </span>
              </div>
              <div className="code-line">
                <span>
                  {" "}
                  <span className="kw">location</span>:{" "}
                  <span className="str">"Cyber Space"</span>
                </span>
              </div>
              <div className="code-line">
                <span>{"}"}</span>
              </div>
              <div className="code-line">
                <span>
                  <span className="kw">prof@steve</span>:
                  <span className="ty">~</span>
                  <span className="str">$</span>{" "}
                  <span className="kw">Begin_</span>
                </span>
              </div>
            </div>
          </div>
          <SkillBars />
        </div>
      </div>
    </section>
  );
};

export default About;
