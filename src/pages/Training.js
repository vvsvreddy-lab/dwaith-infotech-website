import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Training.css";
import Mouse from "../assets/mouse-clicker.png";

const tracks = [
  [
    "↗",
    "Upskilling",
    "Looking to fully build your in-house capabilities? We can provide the training and development you need to enhance your team's existing skills and take them to the next level.",
    [
      "Advanced technical skills development",
      "Industry-specific training programs",
      "Certification preparation",
      "Hands-on practical experience",
    ],
  ],
  [
    "⟳",
    "Reskilling",
    "Have the talent but lack the crucial skills they need to get your projects moving? We can help your team acquire new skills and transition into different roles effectively.",
    [
      "Career transition support",
      "New technology adoption",
      "Cross-functional training",
      "Role-specific skill development",
    ],
  ],
  [
    "♧",
    "Human Skills Development",
    "We can facilitate the development of advanced cognitive capabilities, leadership skills, and soft skills that are essential for success in the modern workplace.",
    [
      "Leadership development programs",
      "Communication skills training",
      "Problem-solving methodologies",
      "Team collaboration techniques",
    ],
  ],
];
export default function Training() {
  return (
    <main className="training-page">
      <section className="training-hero">
        <div className="network" />
        <div>
          <h1>Training &amp; Development</h1>
          <p>
            Empowering your team with the skills they need to succeed in the
            digital age
          </p>
        </div>
      </section>
      <section className="training-intro training-wrap">
        <div className="watermelon">
          <b>BENEFITS</b>
          <img src={Mouse} alt="mouse" style={{ width: '300px' }} />
          <span>♟</span>
        </div>
        <div>
          <h2>
            Upskilling &amp;
            <br />
            Reskilling
            <br />
            Solutions
          </h2>
          <p>
            Dwaith Infotech bridges the skills and opportunity gap by providing
            in-demand Technology skills training and ensures that everyone has
            the opportunity to succeed in the future of work, and beyond.
          </p>
          <p>
            Whether it's helping to foster and build a data-driven culture,
            upskill internal teams, or build talent pipelines through our
            customized training programs.
          </p>
        </div>
      </section>
      <section className="training-tracks">
        <div className="training-wrap">
          <h2>Build The Expertise Your Business Needs</h2>
          <p>
            We can provide specialized training in those skills to help you
            reskill your team quickly and
            <br />
            efficiently and get your projects up and running.
          </p>
          <div>
            {tracks.map(([icon, title, text, features]) => (
              <article key={title}>
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <b>Key Features:</b>
                <ul>
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="why-training">
        <div className="training-wrap">
          <div className="why-copy">
            <h2>
              Why Choose Our
              <br />
              Training Programs?
            </h2>
            <p>
              We blend expertise with innovation to deliver training that
              transforms your team's capabilities and drives real business
              results.
            </p>
          </div>
          <div className="brain-bulb">
            <span>●</span>
            <i>✧</i>
            <b>♧</b>
          </div>
          <div className="why-cards">
            {[
              [
                "◎",
                "Customized Training Programs",
                "Tailored training solutions designed specifically for your organization's needs and objectives.",
              ],
              [
                "♙",
                "Expert Instructors",
                "Learn from industry experts with years of practical experience in their respective fields.",
              ],
              [
                "▣",
                "Flexible Learning Options",
                "Choose from in-person, online, or hybrid learning formats that fit your schedule and preferences.",
              ],
              [
                "✓",
                "Certification Support",
                "Get assistance with industry certifications and professional development credentials.",
              ],
            ].map(([icon, title, text]) => (
              <article key={title}>
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="training-cta">
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
            Book a Free Consultation Call <ArrowForwardIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
