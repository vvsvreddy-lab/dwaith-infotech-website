import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./About.css";

const milestones = [
  ["2016", "Founding", "Dwaith Infotech was founded with a clear vision to transform software that helps businesses work smarter and grow faster."],
  ["2017", "Expansion", "Enhanced our services with consulting and advisory capabilities to better support client needs."],
  ["2018", "Global Presence", "Opened a technology-focused Offshore Development Center in India."],
  ["2019", "SocialBirds Launch", "Rolled out our platform built to bridge philanthropic and nonprofit organizations."],
  ["2023", "AI Transformation", "Pivoted to helping businesses navigate AI-driven digital transformation in a rapidly evolving landscape."],
  ["Current", "Shaping Tomorrow with AI", "Advancing with next-generation AI capabilities to better support our clients' changing demands."],
];
const approaches = [
  ["Think Big", "We approach every challenge with ambition and vision, transforming small, powerful solutions that create lasting impact.", "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=700&q=80"],
  ["Create Impact", "Every strategy we craft is designed to make a meaningful difference, turning insights into action and vision into reality.", "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=700&q=80"],
  ["Connect", "We build bridges between technology and business, fostering collaboration and creating synergies that drive success.", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80"],
  ["Innovate", "We embrace complexity and navigate challenges with creative solutions, constantly pushing boundaries to deliver excellence.", "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=700&q=80"],
];

export default function About() {
  return <main className="about-page">
    <section className="about-hero"><div className="network" /><div><h1>About Dwaith Infotech</h1><p>Driving digital transformation through innovation and expertise</p></div></section>
    <section className="foundation about-wrap"><div className="foundation-copy"><span className="mini-tag">AI Transformation</span><h2>Transforming Ideas into<br /><em>Digital Reality</em></h2>{[["Our Foundation", "Founded in 2016, Dwaith Infotech has evolved from a small development team into a global technology partner. Our growth is driven by a commitment to innovation, quality and measurable results."], ["Our Evolution", "We have built a strong reputation for delivering high-performance software solutions that address complex business challenges. As our capabilities expanded, we also introduced AI-driven technologies, strategic consulting and digital advisory services."], ["Our Future", "Today, we continue to advance our expertise and leverage emerging technologies to help clients stay competitive in a rapidly evolving digital landscape."]].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><div className="possibilities"><span>REALM<br />OF<br />POSSIBILITIES</span><i /></div></section>
    <section className="journey"><div className="about-wrap"><h2>Our Journey</h2><p>A timeline of Dwaith Infotech's growth and evolution</p><div className="timeline">{milestones.map(([year, title, text], i) => <article className={i % 2 ? "right" : "left"} key={year}><div className="timeline-dot">{i === 0 ? "▣" : "✦"}</div><div className="milestone"><small>{year}</small><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="approach about-wrap"><h2>Our Approach</h2><p>How we deliver exceptional results for our clients through our proven methodology</p><div className="approach-grid">{approaches.map(([title, text, image]) => <article key={title}><div style={{backgroundImage:`url(${image})`}} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="about-cta"><h2>Ready to <em>super</em>charge<br />your AI Transformation<br />process?</h2><div><Link to="/contact" className="light-button">Contact Us</Link><Link to="/contact" className="gold-button">Book a Free Consultation Call <ArrowForwardIcon /></Link></div></section>
  </main>;
}
