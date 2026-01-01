import style from "../Components/HeroSection.module.css";
import logo from "../Assets/logo.png";
import hero from "../Assets/hero.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    // HERO SECTION
    <div className={style.heroSection}>
      <div className="sectionContainer">
        {/* Hero content card */}
        <div className={style.heroCard}>
          <div className={style.contentWrapper}>
            {/* logo */}
            <div className={style.logoWrapper}>
              <img src={logo} alt="Logo of Ecoquest" />
            </div>

            <p className={style.tagline}>
              Build sustainable habits, one daily challenge at a time
            </p>
            <p className={style.description}>
              EcoQuest helps you take simple, eco-friendly actions through daily
              challenges. Join others who are building better habits together
              and make sustainability part of your everyday life.{" "}
            </p>

            {/* Call to Action buttons */}
            <div className={style.buttons}>
              <Link to="/challenges">
                <button
                  className={`${style.button} ${style["explore-challenges-btn"]}`}
                >
                  {" "}
                  Explore Challenges
                </button>
              </Link>
              <button className={`${style.button} ${style["sign-up-btn"]}`}>
                Sign Up for free
              </button>
            </div>
          </div>

          {/* Hero card image */}
          <div className={style.heroImageWrapper}>
            <img src={hero} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
