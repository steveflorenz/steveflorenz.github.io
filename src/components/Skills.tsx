import { FaApple, FaCode, FaLinux, FaWindows } from "react-icons/fa";
import "./css/Skills.css";
import { LuCirclePower, LuNetwork } from "react-icons/lu";
import { ImPieChart } from "react-icons/im";
import { SiSecurityscorecard } from "react-icons/si";
import { GiFeather, GiPalette } from "react-icons/gi";
import { BsFillWrenchAdjustableCircleFill } from "react-icons/bs";
import { PiPowerDuotone, PiPowerFill } from "react-icons/pi";
import { TbCodeCircle2Filled } from "react-icons/tb";
import "./Certificates";
import Certificates from "./Certificates.tsx";

const Skills = () => {
  return (
    <section id="skills">
      <div className="skills-inner">
        <div className="reveal">
          <div className="section-label">Experience</div>
          <h2 className="section-title">
            Skills +
            <br />
            <em>Tools</em>
          </h2>
        </div>
        <div className="skills-grid reveal" style={{ transitionDelay: "0.2s" }}>
          <div className="skills-card">
            <span className="skills-icon">
              <TbCodeCircle2Filled />
            </span>
            <div className="skills-title">Programming</div>
            <div className="skills-desc">
              <ul>
                <li>C++</li>
                <li>Java</li>
                <li>Python</li>
                <li>PHP</li>
                <li>JAVASCRIPT</li>
              </ul>
            </div>
          </div>
          <div className="skills-card">
            <span className="skills-icon">
              <LuNetwork />
            </span>
            <div className="skills-title">Network Configration</div>
            <div className="skills-desc">
              <ul>
                <li>Cisco Technologies</li>
                <li>Network Administration</li>
                <li>Firewall Configuration</li>
                <li>VLAN Management</li>
                <li>VPN</li>
              </ul>
            </div>
          </div>
          <div className="skills-card">
            <span className="skills-icon">
              <ImPieChart />
            </span>
            <div className="skills-title">Data Science</div>
            <div className="skills-desc">
              <ul>
                <li>Data Analytics</li>
                <li>Data Visualization</li>
                <li>Data Scraping</li>
                <li>Tableau</li>
                <li>Looker Studios</li>
              </ul>
            </div>
          </div>
          <div className="skills-card">
            <span className="skills-icon">
              <SiSecurityscorecard />
            </span>
            <div className="skills-title">Cyber Security</div>
            <div className="skills-desc">
              <ul>
                <li>Threat Analytics</li>
                <li>Log Analysis &amp; Monitoring</li>
                <li>User Access Control</li>
                <li>Scripting</li>
                <li>Kali Linux</li>
              </ul>
            </div>
          </div>
          {/* LAYER 2 */}
          <div className="skills-card">
            <span className="skills-icon">
              <GiPalette />
            </span>
            <div className="skills-title">Graphics</div>
            <div className="skills-desc">
              <ul>
                <li>Adobe Photoshop</li>
                <li>Adobe Illustrator</li>
                <li>Blender</li>
                <li>Animation</li>
                <li>Character Design</li>
              </ul>
            </div>
          </div>
          <div className="skills-card">
            <span className="skills-icon">
              <PiPowerFill />
            </span>
            <div className="skills-title">Operating Systems</div>
            <div className="skills-desc">
              <ul>
                <li>
                  Linux <FaLinux />
                </li>
                <li>
                  macOS <FaApple />
                </li>
                <li>
                  Windows <FaWindows />
                </li>
              </ul>
            </div>
          </div>
          <div className="skills-card">
            <span className="skills-icon">
              <BsFillWrenchAdjustableCircleFill />
            </span>
            <div className="skills-title">Hardware</div>
            <div className="skills-desc">
              <ul>
                <li>Computer Hardware</li>
                <li>Turnstil SetUp &amp; Installation</li>
                <li>CCTV System Installation</li>
                <li>Fiber Optic Splicing</li>
                <li>RJ45 Crimping</li>
              </ul>
            </div>
          </div>
          <div className="skills-card">
            <span className="skills-icon">
              <GiFeather />
            </span>
            <div className="skills-title">Others</div>
            <div className="skills-desc">
              <ul>
                <li>Administration</li>
                <li>Asset Management</li>
                <li>Team Player</li>
                <li>Analytics</li>
                <li>Attention to detail</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="reveal space-top"></div>
        <Certificates />
      </div>
    </section>
  );
};

export default Skills;
