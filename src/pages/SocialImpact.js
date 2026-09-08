import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./SocialImpact.css";

export default function SocialImpact() {
  return <main className="impact-page">
    <section className="impact-hero"><div className="network" /><div><h1>Social Impact</h1><p>SocialBirds fundraising software gives you the power to raise more money<br />online. Create beautifully branded fundraising pages in minutes.</p></div></section>
    <section className="impact-intro impact-wrap"><div className="gold-hand"><span className="bird-brand">Dwaith<br /><b>SocialBirds</b></span><i /><i /><i /><i /></div><div className="impact-copy"><span className="mission-tag">Our Mission</span><h2>Social Impact<br /><em>Through Technology</em></h2>{[["Our Commitment", "Dwaith Infotech devotes a portion of its time augmenting social impact with Nonprofits and Social Enterprises. We believe in the need for social impact activities at the core of our business and not just another CSR initiative."], ["Our Approach", "Dwaith Infotech works with Nonprofits for subsidized development together with introductions to funders to support their work, with an aim to help Nonprofits with a more social enterprise model for predictable income and better planning."], ["Our Impact", "Nonprofits and social enterprises are on the front lines trying to make this a reality and our ability to help people support these efforts has never been more important."]].map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="impact-flow"><div className="impact-wrap"><h2>How Our Social Impact Flow Works</h2><div className="flow-source"><b><span>◒</span> SocialBirds</b><p>Create beautifully branded fundraising pages in<br />minutes.</p></div><div className="flow-steps"><article><span>♙</span><h3>Nonprofits</h3><p>Organizations on the frontlines seeking sustainable support and tools.</p></article><article><span>♡</span><h3>Dwaith Infotech</h3><p>Subsidized development + strategic guidance to maximize impact.</p></article></div></div></section>
    <section className="impact-cta"><h2>Ready to <em>super</em>charge<br />your AI Transformation<br />process?</h2><div><Link to="/contact" className="light-button">Contact Us</Link><Link to="/contact" className="gold-button">Book a Free Consultation Call <ArrowForwardIcon /></Link></div></section>
  </main>;
}
