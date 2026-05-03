import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiReact } from "react-icons/si";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-copy">
        {" "}
        2026 STEVE FLORENZ. ALL RIGHTS RESERVED.
      </div>
      <div className="footer-sig">
        DESIGNED & BUILT BY STEVE FLORENZ WITH REACT.JS
        <SiReact
          style={{
            display: "inline",
            verticalAlign: "middle",
            marginLeft: "5px",
          }}
        />
      </div>
      <div className="footer-social">
        <span>
          <a
            href="https://github.com/steveflorenz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://linkedin.com/in/sf-mendoza"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </span>
        <span>
          <a
            href="https://facebook.com/tochteddy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
