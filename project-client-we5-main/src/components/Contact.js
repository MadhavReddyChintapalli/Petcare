import { useState } from "react";
import Dog from "../assets/puppy-on-bed.jpg";
import { postContactDetails } from "../api/contact";
import Button from "@material-ui/core/Button";
import "../styles/contact.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async () => {
    try {
      await postContactDetails({
        firstName,
        lastName,
        email,
        message,
      });
      window.location = "/contact"
    } catch (error) {}
  };
  return (
    <div className="contactus">
      <div className="contact-page-image">
        <img src={Dog} className="contact-img" alt="contact" />
      </div>
      <div className="contact-details">
        <div className="heading-text">Contact</div>
        <div className="sub-heading">Service area in Toronto</div>
        <div className="contact-info">
          <div className="contact-para">
            <div>We'd love to hear from you!</div>
            <div>Need to find a new home for your cat?</div>
            <div>See our Resources page for information. </div>
          </div>

          <div className="service-zone">
            All Other Services: Toronto (City Wide)
          </div>
          <div className="licence-details">Licensed, bonded and insured.</div>
          <div className="contact-number">Phone: 123-456-7890</div>
        </div>
        <div className="contact-form">
          <label>First Name</label>
          <input
            id="outlined-basic"
            label="Title"
            variant="outlined"
            className="custom-form-text-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name</label>
          <input
            id="outlined-basic"
            label="Title"
            variant="outlined"
            className="custom-form-text-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Email</label>
          <input
            id="outlined-basic"
            label="Title"
            variant="outlined"
            className="custom-form-text-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Message</label>
          <textarea
            aria-label="description"
            rowsMin={3}
            className="custom-text-area-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className="send-btn"
            disabled={!email || !firstName || !lastName || !message}
            onClick={handleSubmit}
          >
            Send!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
