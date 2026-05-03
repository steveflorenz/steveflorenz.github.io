import { Link, useLocation } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      if (location.pathname !== "/") {
        window.location.href = `/${path}`; // Navigate to home and then fragment
      } else {
        document.querySelector(path)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav>
      <Link to="/" className="nav-logo" onClick={(e) => handleNavLinkClick(e, "#hero")}>
        &lt;<span>dev</span>/sec&gt;
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" onClick={(e) => handleNavLinkClick(e, "#hero")}>Home</Link>
        </li>
        <li>
          <Link to="/" onClick={(e) => handleNavLinkClick(e, "#projects")}>Projects</Link>
        </li>
        <li>
          <Link to="/" onClick={(e) => handleNavLinkClick(e, "#skills")}>Skills</Link>
        </li>
        <li>
          <Link to="/" onClick={(e) => handleNavLinkClick(e, "#contact")}>Contact</Link>
        </li>
      </ul>

      <div className="nav-status">
        <span className="status-dot"></span>
        Available for work
      </div>
    </nav>
  );
};

export default Navbar;
