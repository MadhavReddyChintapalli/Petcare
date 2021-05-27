import ImgLogo from "../assets/logo.png";
import "../styles/footer.css";

const Footer = () => {
  return (
    <div id="Footer">
      <div className="footer-inner-container">
        <div className="footer-logo-container">
          <img src={ImgLogo} className="footer-logo" alt="logo" />
          <div>#PetCare</div>
        </div>
        <div className="footer-links-container">
          <a href="/terms-and-conditions">Terms & Conditions</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
