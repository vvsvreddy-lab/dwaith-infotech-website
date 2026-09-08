import React from "react";
import { Link } from "react-router-dom";
import "./SiteChrome.css";
import Globe from "../assets/globe.png";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-art">
          <img src={Globe} alt="globe" style={{ height: '300px', width: '300px' }} />
        <p className="footer-art-label">Ideas in motion</p>
      </div>
      <div className="footer-links">
        <div><b>SERVICES</b><span>AI Solutions &amp; Integration</span><span>Application Development</span><span>Advisory &amp; Consulting</span><span>Business Intelligence</span><span>Data &amp; Analytics</span></div>
        <div><b>LINKS</b><Link to="/about">About</Link><span>Training</span><Link to="/contact">Contact Us</Link></div>
        <div><b>UNITED STATES</b><span>3415 Cluster Road suite 141, Plano, TX, USA</span><span>info@dwaithinc.com</span><span>+1 945-369-8417</span></div>
      </div>
      <small className="copyright">© 2026 Dwaith Infotech. All rights reserved.</small>
    </footer>
  );
}
