import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Header from "../Components/Header";
import style from "../pages/ChallengeDetails.module.css";
import "../index.css";
import Footer from "../components/Footer";

import { FaRegClock } from "react-icons/fa";

const ChallengeDetails = ({ challengeJSON }) => {
  const { challengeId } = useParams();
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState("");
  const [btnContent, setBtnContent] = useState("Join Challenge");
  const [isDisabled, setIsDisabled] = useState(true);

  const challenge = challengeJSON.find(
    (item) => item.id === Number(challengeId),
  );

  if (!challenge) {
    return <p>Challenge nicht gefunden</p>;
  }

  const [checkedItemsDaily, setCheckedItemsDaily] = useState(
    challenge.toDo.map(() => false),
  );

  const handleCheckboxChangeDaily = (index) => {
    const updated = [...checkedItemsDaily];
    updated[index] = !updated[index];
    setCheckedItemsDaily(updated);
  };

  const [checkedItemsUnique, setCheckedItemsUnique] = useState(
    challenge.toDo.map(() => false),
  );

  const handleCheckboxChangeUnique = (index) => {
    const updated = [...checkedItemsUnique];
    updated[index] = !updated[index];
    setCheckedItemsUnique(updated);
  };

  const handleJoinChallenge = () => {
    if (isAuthenticated) {
      setMessage("Challenge registered!🥳");
      resetMessage();
      setBtnContent("Registered!");
      setIsDisabled(false);
    } else {
      setMessage("You need to be logged in first 🙂!");
      resetMessage();
    }
  };

  const resetMessage = () => {
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      <div>
        <Header />
        <div className={style.spacer}>
          <div className={style["content-container"]}>
            <div className={style["challenge-main-info"]}>
              <div className={style["challenge-main-info-text"]}>
                <h1>{challenge.title}</h1>
                <p className={style["subheading"]}>{challenge.tagline}</p>
                <p>{challenge.description}</p>
                <div className={style.duration}>
                  <FaRegClock /> &nbsp; Duration: {challenge.days} days
                </div>
                <button onClick={() => handleJoinChallenge()}>
                  {btnContent}
                </button>{" "}
                {message && (
                  <p
                    className={`${style.loginMessage} ${
                      isAuthenticated
                        ? style.successMessage
                        : style.errorMessage
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
              <div className={style["challenge-main-info-image"]}>
                <img src={challenge.cardImage} alt={challenge.title} />
              </div>
            </div>

            <div className={style["challenge-todos"]}>
              <div className="daily-todos-section">
                <h2>Daily To Dos</h2>
                <p>
                  Check off at least one task a day to keep up your daily
                  streak.
                </p>
                <ul className={style["todo-list"]}>
                  {challenge.toDo.map((toDo, index) => (
                    <li key={toDo.id} className={style["todo-item"]}>
                      <label className={style["todo-label"]}>
                        <input
                          disabled={isDisabled}
                          type="checkbox"
                          checked={checkedItemsDaily[index]}
                          onChange={() => handleCheckboxChangeDaily(index)}
                          className={style["todo-checkbox"]}
                        />
                        <span
                          className={
                            checkedItemsDaily[index]
                              ? style["todo-text"] + " " + style["checked"]
                              : style["todo-text"]
                          }
                        >
                          {toDo.text}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="unique-todos-section">
                <h2>Unique To Dos</h2>
                <p>
                  Finish these tasks for a point boost and a create a lasting
                  impact.
                </p>
                <ul className={style["todo-list"]}>
                  {challenge.toDo.map((toDo, index) => (
                    <li key={toDo.id} className={style["todo-item"]}>
                      <label className={style["todo-label"]}>
                        <input
                          disabled={isDisabled}
                          type="checkbox"
                          checked={checkedItemsUnique[index]}
                          onChange={() => handleCheckboxChangeUnique(index)}
                          className={style["todo-checkbox"]}
                        />
                        <span
                          className={
                            checkedItemsUnique[index]
                              ? style["todo-text"] + " " + style["checked"]
                              : style["todo-text"]
                          }
                        >
                          {toDo.text}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ChallengeDetails;
