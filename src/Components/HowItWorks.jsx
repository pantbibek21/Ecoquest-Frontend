import style from "../Components/HowItWorks.module.css";

import signUpImg from "../Assets/sign-up.png";
import challengeImg from "../Assets/challenge.png";
import calenderImg from "../Assets/calender.png";
import stayConsistentImg from "../Assets/stay-consistent.png";

const HowItWorks = () => {
  return (
    <div className={style.howItWorksSection}>
      {/* Layout container for consistent page spacing */}
      <div className="sectionContainer">
        <div className={style.sectionCard}>
          {/* Section heading + tagline */}
          <h2 className={style.sectionHeading}>How it works</h2>
          <p className={style.sectionTagline}>Sustainability made simple</p>

          {/* Wrapper holding all step cards */}
          <div className={style.cardWrapper}>
            {/* --- STEP CARD 1 --- */}
            <div className={style.card}>
              <div className={style.cardImageWrapper}>
                <img src={signUpImg} alt="" />
              </div>
              <p className={style.cardHeading}>1. Sign Up</p>
              <p className={style.cardDescription}>
                Create a free account to track your challenges and daily
                progress.
              </p>
            </div>

            {/* --- STEP CARD 2 --- */}
            <div className={style.card}>
              <div className={style.cardImageWrapper}>
                <img src={challengeImg} alt="" />
              </div>
              <p className={style.cardHeading}>2. Join a Challenge</p>
              <p className={style.cardDescription}>
                Choose a challenge that fits your interests and lifestyle.
              </p>
            </div>

            {/* --- STEP CARD 3 --- */}
            <div className={style.card}>
              <div className={style.cardImageWrapper}>
                <img src={calenderImg} alt="" />
              </div>
              <p className={style.cardHeading}>3. Submit Daily To-Dos</p>
              <p className={style.cardDescription}>
                Complete small, practical actions and check in each day.
              </p>
            </div>

            {/* --- STEP CARD 4 --- */}
            <div className={style.card}>
              <div className={style.cardImageWrapper}>
                <img src={stayConsistentImg} alt="" />
              </div>
              <p className={style.cardHeading}>4. Stay Consistent</p>
              <p className={style.cardDescription}>
                Build momentum by showing up daily one step at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
