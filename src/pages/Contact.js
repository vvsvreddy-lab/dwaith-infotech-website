import React, { useState } from "react";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="network" />
        <div>
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Reach out to us with any questions or
            inquiries.
          </p>
        </div>
      </section>
      <section className="contact-area">
        <div className="contact-wrap">
          <form className="message-form" onSubmit={submit}>
            <h2>Send us a Message</h2>
            <div className="form-grid">
              <label>
                Name *<input required name="name" />
              </label>
              <label>
                Email *<input required type="email" name="email" />
              </label>
              <label>
                Company
                <input name="company" />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" />
              </label>
            </div>
            <label>
              Subject *
              <select required defaultValue="">
                <option value="" disabled>
                  Select a subject
                </option>
                <option>General enquiry</option>
                <option>AI & Data Services</option>
                <option>Application Development</option>
                <option>Careers</option>
              </select>
            </label>
            <label>
              Message *<textarea required name="message" />
            </label>
            <button type="submit">
              <SendOutlinedIcon /> Send Message
            </button>
            {sent && (
              <span className="form-confirmation">
                Thank you — your message has been sent.
              </span>
            )}
          </form>
          <div className="contact-details">
            <h2>Contact Information</h2>
            <article>
              <LocationOnOutlinedIcon />
              <div>
                <h3>US Office</h3>
                <p>
                  3415 Cluster Road suite 141
                  <br />
                  Plano, TX, USA
                </p>
              </div>
            </article>
            <article>
              <EmailOutlinedIcon />
              <div>
                <h3>Email Addresses</h3>
                <p>
                  info@dwaithinc.com
                </p>
              </div>
            </article>
            <article>
              <PhoneOutlinedIcon />
              <div>
                <h3>Contact No</h3>
                <p>+1 945-369-8417</p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="contact-cta">
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
