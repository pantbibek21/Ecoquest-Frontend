import style from "../Components/Footer.module.css";

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
                <a href="#">Challenges</a>
              </li>
              <li>
                <a href="#">How it Works</a>
              </li>
            </ul>

            <ul className={style.column}>
              <li className={style.heading}>Company</li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>

            <ul className={style.column}>
              <li className={style.heading}>Legal</li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Term of Service</a>
              </li>
              <li>
                <a href="#">Accessibility</a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
