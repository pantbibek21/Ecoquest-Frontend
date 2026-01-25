import style from "../Components/Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={style.footerSection}>
      {/* Layout container for consistent page spacing */}
      <div className="sectionContainer">
        <footer>
          <nav>
            <ul className={style.column}>
              <li className={style.heading}>Product</li>
              <li>
                <Link to="/challenges">Challenges</Link>
              </li>
              <li>
                <Link to="/home#how-it-works">How it Works</Link>
              </li>
            </ul>

            <ul className={style.column}>
              <li className={style.heading}>Company</li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>

            <ul className={style.column}>
              <li className={style.heading}>Legal</li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service">Term of Service</Link>
              </li>
              <li>
                <Link to="/accessibility">Accessibility</Link>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
