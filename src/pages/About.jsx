import Header from "../Components/Header";
import Footer from "../Components/Footer";
import style from "../pages/contentpages.module.css";
import AboutJourney from "../Assets/AboutJourney.jpg";
import AboutFree from "../Assets/AboutFree.jpg";
import AboutExpectation from "../Assets/AboutExpectation.jpg";

const About = () => {
  return (
    <div>
      <Header />
      <div className={style.spacer}>
        <div className={style["content-container"]}>
          <h1>We care for the planet - together</h1>
          <p>
            EcoQuest is completely free - no hidden costs, no premium features.
            We want you to join our journey to more sustainable habits without
            any barriers.
          </p>
          <p>But how and why? Learn more about EcoQuest here.</p>

          <div className={style["about-section"]}>
            <img src={AboutJourney} alt=""></img>
            <div className={style["about-text"]}>
              <h2>Where our journey started</h2>
              <p>
                The idea started in Münster. Four Web Development learners at
                TechLabs got together and with their passion for environmental
                issues, came up with the idea. With more ideas than time, but a
                full commitment of making the best of it, EcoQuest was born.
              </p>
            </div>
          </div>

          <div className={style["about-section"]} id="rev">
            <div className={style["about-text"]}>
              <h2>Is it really free?</h2>
              <p>
                {" "}
                100% yes. We work on this project in our free time and were
                mentored by the TechLabs team, a non-profit organisation led by
                volonteers. If you're helping the environment, that's payment
                enough.
              </p>
            </div>
            <img src={AboutFree} alt=""></img>
          </div>

          <div className={style["about-section"]}>
            <img src={AboutExpectation} alt=""></img>
            <div className={style["about-text"]}>
              <h2>What can you expect?</h2>
              <p>
                We are working on new features, challenges and ideas to make
                your EcoQuest experience even better. We want to help you get on
                the right track and support you in your journey to more
                sustainable habits.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
