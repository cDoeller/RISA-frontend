import { React, useState } from "react";
import "../styles/styles-pages/ContactPage.css";
import DecorativeHeader from "../components/DecorativeHeader";
import Notification from "../components/Notification";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // SEND EMAIL VIA BACKEND

    setMessageSent(true);
  };

  return (
    <>
      {messageSent && (
        <Notification text="Your message has been sent successfully." />
      )}

      <DecorativeHeader />

      <section className="contact-form-section page-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <label className="form-input-label" htmlFor="">
            name
            <input
              className="form-input-input form-input-type-text"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label className="form-input-label" htmlFor="">
            email
            <input
              className="form-input-input form-input-type-text"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label className="form-input-label" htmlFor="">
            message
            <textarea
              className="form-input-textarea"
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </label>
          <button className="form-button pointer" type="submit">
            send
          </button>
        </form>
      </section>
    </>
  );
}

export default ContactPage;
