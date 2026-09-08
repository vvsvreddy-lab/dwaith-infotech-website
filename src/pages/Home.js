import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Logo from "../assets/logo.png";
import "./Home.css";

const partners = [
  "BENEFITWALL",
  "TOYOTA",
  "Santander",
  "BRISTLECONE",
  "Fidelity",
  "ATLAS",
  "ORCASO",
  "BLAISSON GROUP",
  "shipium",
  "SGT",
];
const stories = [
  [
    "E-Commerce Platform",
    "Legacy user experience was limiting growth during peak periods.",
    "A cloud-native storefront with intelligent personalisation and resilient checkout flows.",
  ],
  [
    "Voice AI Technology",
    "A support team needed a faster way to resolve high-volume customer queries.",
    "Conversational AI that understands intent and hands off smoothly to human experts.",
  ],
  [
    "Data Analytics Firm",
    "Manual reporting made timely business decisions difficult.",
    "Unified analytics and predictive dashboards for the entire organisation.",
  ],
  [
    "Healthcare Network",
    "Disparate systems prevented a consistent patient experience.",
    "Secure, connected services designed around patient and clinician needs.",
  ],
];

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const valueRef = useRef(null);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return undefined;

    let frameId;
    let started = false;
    const duration = 1600;

    const startCounting = () => {
      if (started) return;
      started = true;
      const startTime = performance.now();
      const update = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) frameId = requestAnimationFrame(update);
      };
      frameId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startCounting();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target]);

  return <strong ref={valueRef}>{count}{suffix}</strong>;
}

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="hero-grain" />
        <div className="hero-copy">
          <div className="hero-mark">
            <img src={Logo} alt="Dwaith" style={{ width: '80px' }} />
          </div>
          <p className="eyebrow">Build what's next</p>
          <h1>
            TALENT
            <br />
            &amp; JOBS
          </h1>
          <p>Technology and people, perfectly connected.</p>
          <Link className="dark-button" to="/contact" style={{ fontSize: '16px' }}>
            Contact Us <ArrowForwardIcon />
          </Link>
        </div>
      </section>

      <section className="trusted section-pad">
        <h2>Trusted by Leading Organizations</h2>
        <p>
          We're proud to partner with innovative companies around the world.
        </p>
        <div className="partner-marquee">
          {[...partners, ...partners].map((partner, i) => (
            <span key={i}>{partner}</span>
          ))}
        </div>
      </section>

      <section className="intro section-pad content-width">
        <div className="intro-text">
          <h2>
            Pushing the
            <br />
            boundaries
            <br />
            with{" "}
            <b>
              AI and
              <br />
              Technology
            </b>
          </h2>
          <p>
            We merge technology and visual design to create innovative,
            impactful solutions. Our mission is to deliver designs that go
            beyond the typical, functional, redefining what the digital space
            can be.
          </p>
        </div>
        <div className="ai-word" aria-label="AI">
          <span>A</span>
          <span>I</span>
        </div>
        <div className="metrics">
          <div>
            <CountUp target={320} suffix="+" />
            <small>Projects Completed</small>
          </div>
          <div>
            <CountUp target={150} suffix="+" />
            <small>Happy Clients</small>
          </div>
          <div>
            <CountUp target={98} suffix="%" />
            <small>Customer Retention</small>
          </div>
          <div>
            <CountUp target={1000} suffix="+" />
            <small>Person Years of Experience</small>
          </div>
        </div>
      </section>

      <section className="ai-services">
        <div className="capsule-art">
          <div className="capsule-logo">Dwaith</div>
          <i />
          <b />
        </div>
        <div className="ai-services-copy">
          <h2>
            AI Services <em>for</em>
            <br />
            your <em>enterprise</em>
          </h2>
          <article>
            <h3>AI Solutions &amp; Integration</h3>
            <p>
              Harness the power of artificial intelligence to automate
              processes, gain insights, and drive innovation. Our AI solutions
              are tailored to transform your business potential.
            </p>
          </article>
          <article>
            <h3>Consulting and Advisory</h3>
            <p>
              Strategic guidance from industry experts to optimise your
              technology investments and improve business processes.
            </p>
          </article>
          <article>
            <h3>Business Intelligence</h3>
            <p>
              Transform your data into actionable insights with our
              comprehensive business intelligence platform.
            </p>
          </article>
        </div>
      </section>

      <section className="stories section-pad">
        <h2>Success Stories</h2>
        <div className="story-row">
          {stories.map(([title, challenge, solution], i) => (
            <article className="story-card" key={title}>
              <div className={`story-avatar avatar-${i}`} />
              <h3>{title}</h3>
              <p>
                <b>CHALLENGE:</b> {challenge}
              </p>
              <p>
                <b>SOLUTION:</b> {solution}
              </p>
              <a href="#stories">
                Explore story <ArrowForwardIcon />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="careers">
        <div className="career-copy">
          <h2>
            C<span>are</span>er in AI &amp; Technology
          </h2>
          <div className="job-list">
            {[
              "Senior Full-Stack Developer",
              "UX/UI Designer",
              "Product Manager",
              "DevOps Engineer",
            ].map((job, i) => (
              <div key={job}>
                <small>{i % 2 ? "DESIGN" : "ENGINEERING"}</small>
                <b>{job}</b>
                <span>{i === 1 ? "Remote" : "USA"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pencil">
          <div className="pencil-tip" />
          <div className="pencil-body">
            <i />
            <i />
            <i />
          </div>
        </div>
      </section>

      <section className="industries section-pad">
        <h2>
          Powering Talent Across
          <br />
          <em>Industries</em>
        </h2>
        <p>
          We connect top talent with leading organizations across diverse
          industries,
          <br />
          delivering exceptional results through our comprehensive staffing
          solutions.
        </p>
        <div className="people-strip">
          {[
            "1519085361-89ce3a4b4e2d",
            "1494790108377-be9c29b29330",
            "1500648767791-00dcc994a43e",
            "1507003211169-0a1dd7228f2d",
            "1573496359142-b8d87734a5a2",
            "1507591064344-4c6ce005b128",
            "1531123897727-8f129e1688ce",
          ].map((id, i) => (
            <div
              key={id}
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=320&q=80)`,
              }}
            />
          ))}
        </div>
      </section>

      <section className="final-cta section-pad">
        <h2>
          Ready to <em>super</em>charge
          <br />
          your AI Transformation
          <br />
          process?
        </h2>
        <div>
          <Link to="/contact" className="light-button">
            Contact Us
          </Link>
          <Link to="/contact" className="gold-button">
            Book Free Consultation Call
          </Link>
        </div>
      </section>
    </main>
  );
}
