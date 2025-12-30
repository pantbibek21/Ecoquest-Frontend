import style from "../Components/RegistrationCard.module.css";
import youthGroupImg from "../Assets/youth-group.png";

const RegistrationCard = () => {
  return (
    <div className={style.registrationSection}>
      {/* Layout container for consistent page spacing */}
      <div className="sectionContainer">
        <div className={style.sectionCard}>
          <div className={style.cardContent}>
            <h2 className={style.cardHeading}>
              Start your first eco challenge today
            </h2>
            <p>Take one small step. Repeat it daily.</p>
            <p>Let it grow into a habit.</p>
            <button className={style.registerBtn}>Register for free</button>
          </div>

          <div className={style.cardImageWrapper}>
            <img src={youthGroupImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCard;
