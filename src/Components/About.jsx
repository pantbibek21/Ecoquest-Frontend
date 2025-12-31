import style from "../Components/About.module.css";
import { FaLongArrowAltRight } from "react-icons/fa";

const About = () => {
  return (
    <div className={style.aboutSection}>
      {/* Layout container for consistent page spacing */}
      <div className="sectionContainer">
        <div className={style.sectionCard}>
          <h2 className={style.cardHeading}>About EcoQuest</h2>
          <p>
            EcoQuest was created to make sustainable living approachable and
            practical. We believe meaningful change starts with small,
            consistent actions that anyone can take every day.
          </p>
          <button className={style.meetTheTeamBtn}>
            {" "}
            <a href="#">
              Meet the team{" "}
              <span className={style.icon}>
                <FaLongArrowAltRight />
              </span>
            </a>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
