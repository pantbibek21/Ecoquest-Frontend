import style from "../Components/Testimonial.module.css";
import SebastianImg from "../Assets/sebastian.png";
import JannaImg from "../Assets/Janna.png";
import DavidImg from "../Assets/David.png";

const Testimonial = () => {
  return (
    <div className={style.testimonialSection}>
      {/* Layout container for consistent page spacing */}
      <div className="sectionContainer">
        <div className={style.sectionCard}>
          <h2 className={style.sectionHeading}>What people are saying</h2>

          {/* Wrapper holding all step cards */}
          <div className={style.cardWrapper}>
            <div className={style.profileCard}>
              <div className={style.imageWrapper}>
                <img src={SebastianImg} alt="" />
              </div>

              <p className={style.cardDescription}>
                I always wanted to live more sustainably but didn't know where
                to start. EcoQuest broke it down into small daily actions that
                actually fit into my routine. The challenges made it easy to
                stay consistent.
              </p>

              <p className={style.personDetail}>Sebastian, 26</p>
            </div>{" "}
            <div className={style.profileCard}>
              <div className={style.imageWrapper}>
                <img src={JannaImg} alt="" />
              </div>

              <p className={style.cardDescription}>
                The daily challenges helped me build habits without feeling
                overwhelmed. Checking in every day kept me accountable, and
                seeing others do the same was surprisingly motivating.
              </p>

              <p className={style.personDetail}>Janna, 22</p>
            </div>{" "}
            <div className={style.profileCard}>
              <div className={style.imageWrapper}>
                <img src={DavidImg} alt="" />
              </div>

              <p className={style.cardDescription}>
                I've tried making eco-friendly changes before, but I always
                dropped off. With EcoQuest, the structure of challenges and
                daily to-dos helped me stay on track and actually finish what I
                started.
              </p>

              <p className={style.personDetail}>David, 29</p>
            </div>{" "}
          </div>

          <div className={style.contentSection}>
            <h2 className={style.contentHeading}>
              You're not doing this alone.
            </h2>

            <p className={style.message}>
              EcoQuest is powered by people taking small actions every day. When
              you join a challenge, you're joining others who are working toward
              the same goal at their own pace.
            </p>

            <p className={style.stats}>
              1,240 members · 18 active challenges · 620 daily tasks completed
              today
            </p>

            <p>Consistency matters more than perfection.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
