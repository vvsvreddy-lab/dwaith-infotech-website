import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import "./SiteChrome.css";

export default function Navbar() {
  const { pathname } = useLocation();
  const links = [
    ["About", "/about"],
    ["Services", "/services"],
    // ["Products", "/products"],
    ["Training", "/training"],
    // ["Social Impact", "/social-impact"],
    ["Contact Us", "/contact"],
  ];
  return (
    <header className="site-header">
      <Link to="/" className="site-logo">
        <img src={Logo} alt="Dwaith" />
      </Link>
      <nav>
        {links.map(([label, path]) => (
          <Link
            key={path}
            to={path}
            className={pathname === path ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </nav>
      <Link
        className={`header-contact ${pathname === "/contact" ? "active" : ""}`}
        to="/contact"
      >
        Contact
      </Link>
    </header>
  );
}
