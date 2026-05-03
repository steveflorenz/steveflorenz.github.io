import { Link } from "react-router-dom";
import "./css/Projects.css";

const Projects = () => {
  return (
    <section id="projects">
      <div className="projects-inner">
        <div className="projects-header reveal">
          <div style={{ width: "100%" }}>
            <div className="section-label">Development Works</div>
            <h2 className="section-title">
              Projects +
              <br />
              <em>Research</em>
            </h2>
          </div>
        </div>
        <div className="projects-grid">
          <div className="project-card featured reveal">
            <div className="project-num">001</div>
            <div className="project-tags">
              <span className="tag tag-cyan">Website</span>
              <span className="tag tag-green">Design</span>
              <span className="tag tag-cyan">SEO</span>
              <span className="tag tag-green">DNS</span>
              <span className="tag tag-red">Security</span>
              <span className="tag tag-cyan">Configuration</span>
            </div>
            <div className="project-name">Corporate Website</div>
            <div className="project-desc">
              A corporate website designed to showcase comprehensive IT and
              engineering services, highlighting expertise in managed IT,
              cybersecurity, and connectivity solutions. The platform serves as
              the organization's primary online presence, providing
              detailedClinux information on service offerings and company
              capabilities to stakeholders and prospective clients.
            </div>
            <div className="project-footer">
              <a
                href="https://www.lmiitsolutions.com"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                VIEW → <span>website</span>
              </a>
              <span className="project-meta">2024 - 2025</span>
            </div>
          </div>
          <div
            className="project-card reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="project-num">002</div>
            <div className="project-tags">
              <span className="tag tag-cyan">Google</span>
              <span className="tag tag-cyan">JavaScript</span>
              <span className="tag tag-green">workflow</span>
            </div>
            <div className="project-name">Accountability Form Automation</div>
            <div className="project-desc">
              An automated workflow using Google Forms and Google Workspace
              tools that processes form submissions, generates a PDF document
              from the collected data, and sends it automatically to the
              intended recipient via email.
            </div>
            <div className="project-footer">
              <Link to="/google-auto" className="project-link">
                VIEW →
              </Link>
              <span className="project-meta">2024 – 2025</span>
            </div>
          </div>
          <div
            className="project-card reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="project-num">// 003 </div>
            <div className="project-tags">
              <span className="tag tag-cyan">Google</span>
              <span className="tag tag-green">Automation</span>
              <span className="tag tag-red">App Script</span>
            </div>
            <div className="project-name">Google Automated Scheduler</div>
            <div className="project-desc">
              Built an automated scheduling engine to handle the heavy lifting
              of candidate logistics. Google Forms integrated with Google
              Calendar so that the moment an applicant submits their
              availability, the system automatically schedules interviews and
              sends out calendar invites to both the applicant and the
              interviewers, streamlining the recruitment process and eliminating
              manual scheduling tasks.
            </div>
          </div>
          <div
            className="project-card reveal"
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="project-num">// 004</div>
            <div className="project-tags">
              <span className="tag tag-red">CodeIgniter</span>
              <span className="tag tag-cyan">PHP</span>
              <span className="tag tag-green">WEB APP</span>
            </div>
            <div className="project-name">Inventory Web Application</div>
            <div className="project-desc">
              Participated in the development of an inventory web-app during my
              internship, contributing to the front-end implementation within an
              MVC-based architecture using CodeIgniter web framework.
            </div>
            <div className="project-footer">
              <a href="#" className="project-link">
                VIEW →
              </a>
              <span className="project-meta">2023</span>
            </div>
          </div>
          <div
            className="project-card reveal"
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="project-num">// 005</div>
            <div className="project-tags">
              <span className="tag tag-red">CodeIgniter</span>
              <span className="tag tag-cyan">PHP</span>
              <span className="tag tag-green">Arduino</span>
            </div>
            <div className="project-name">Internship Experiment Project</div>
            <div className="project-desc">
              An experimental intelligent shopping cart project capable of
              returning to its designated post. The initiative involved
              collaboration between mechatronics interns, senior web developers,
              and computer science interns to explore the integration of
              hardware systems with web applications while exposing interns to
              new technologies.
            </div>
            <div className="project-footer">
              <a href="#" className="project-link">
                VIEW →
              </a>
              <span className="project-meta">2022</span>
            </div>
          </div>
        </div>
      </div>
      {/* NETWORK INFRA & SYSTEMS */}
      <div className="projects-inner space-top">
        <div className="projects-header reveal">
          <div>
            <div className="section-label">Systems & Infrastructure</div>
            <h2 className="section-title">
              Projects +<br />
              <em>Implementation</em>
            </h2>
          </div>
        </div>

        <div className="projects-grid">
          <div className="project-card featured reveal">
            <div className="project-num">001</div>
            <div className="project-tags">
              <span className="tag tag-cyan">Odoo ERP</span>
              <span className="tag tag-green">Workflow</span>
              <span className="tag tag-red">Implementation</span>
              <span className="tag tag-green">Helpdesk</span>
              <span className="tag tag-red">Field Service</span>
              <span className="tag tag-cyan">CRM</span>
              <span className="tag tag-cyan">Project</span>
              <span className="tag tag-green">Billing</span>
            </div>
            <div className="project-name">Process & System Implementation</div>
            <div className="project-desc">
              Designed and implemented a structured helpdesk workflow to
              streamline issue tracking, prioritization, and resolution.
              Configured and customized Odoo ERP modules–including CRM,
              Ticketing, Billing, and Project to centralize operations, improve
              response time, and enhance service visibility across teams.
            </div>
            <div className="project-footer">
              <a href="#" className="project-link">
                VIEW →
              </a>
              <span className="project-meta">2024 - 2025</span>
            </div>
          </div>

          <div
            className="project-card reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="project-num">// 002</div>
            <div className="project-tags">
              <span className="tag tag-red">CCTV</span>
              <span className="tag tag-green">Network</span>
              <span className="tag tag-cyan">Configuration</span>
            </div>
            <div className="project-name">
              Industrial CCTV Surveillance System Deployment
            </div>
            <div className="project-desc">
              Participated in the design, implementation, and configuration of a
              CCTV surveillance system for a large distillery facility in the
              Philippines, collaborating with engineers during implementation
              and system integration.
            </div>
            <div className="project-footer">
              <a href="#" className="project-link">
                VIEW →
              </a>
              <span className="project-meta">2026</span>
            </div>
          </div>

          <div
            className="project-card reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="project-num">// 003</div>
            <div className="project-tags">
              <span className="tag tag-red">Access Control</span>
              <span className="tag tag-green">Network</span>
              <span className="tag tag-cyan">Configuration</span>
            </div>
            <div className="project-name">
              Campus Access Control & Turnstile System Deployment
            </div>
            <div className="project-desc">
              Participated in the deployment and configuration of a campus
              access control and turnstile system for a major university,
              collaborating with engineers and techs to support integration,
              hardware setup, and access management infrastructure.
            </div>
            <div className="project-footer">
              <a href="#" className="project-link">
                VIEW →
              </a>
              <span className="project-meta">2026</span>
            </div>
          </div>

          <div
            className="project-card featured reveal"
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="project-num">// 004</div>
            <div className="project-tags">
              <span className="tag tag-green">Network</span>
              <span className="tag tag-red">Security</span>
              <span className="tag tag-green">Cisco</span>
              <span className="tag tag-cyan">VPN</span>
              <span className="tag tag-red">Firewalls</span>
              <span className="tag tag-cyan">Configuration</span>
            </div>
            <div className="project-name">
              Cisco Hyperconverged Infrastructure (HCI) Deployment
            </div>
            <div className="project-desc">
              Contributed in the deployment and network testing of a Cisco
              Hyperconverged Infrastructure solution for a major university,
              collaborating with engineers to support system implementation,
              infrastructure integration, firewall and network configuration,
              and system testing.
            </div>
            <div className="project-footer">
              <a href="#" className="project-link">
                VIEW →
              </a>
              <span className="project-meta">2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
