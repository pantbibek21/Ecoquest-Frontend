import { useParams } from "react-router-dom";
import { useState } from "react";

import Header from "../Components/Header";
import style from "../pages/ChallengeDetails.module.css";
import "../index.css";
import Footer from "../components/Footer";

import { FaRegClock } from "react-icons/fa";

import challengeJSON from "../data/challenges.json";
import categoryJSON from "../data/category.json";



const ChallengeDetails = () => {
    const { challengeId } = useParams();
    console.log("challengeId:", challengeId);
    console.log("challengeJSON:", challengeJSON);

    const challenge = challengeJSON.find(
        (item) => item.id === Number(challengeId)
    );

      console.log("found challenge:", challenge);

  if (!challenge) {
    return <p>Challenge nicht gefunden</p>;
  }

  const [checkedItemsDaily, setCheckedItemsDaily] = useState(
    challenge.dailyToDo.map(() => false)
  );

  const handleCheckboxChangeDaily = (index) => {
    const updated = [...checkedItemsDaily];
    updated[index] = !updated[index];
    setCheckedItemsDaily(updated);
  };

  const [checkedItemsUnique, setCheckedItemsUnique] = useState(
    challenge.uniqueToDo.map(() => false)
  );

  const handleCheckboxChangeUnique = (index) => {
    const updated = [...checkedItemsUnique];
    updated[index] = !updated[index];
    setCheckedItemsUnique(updated);
  };

    return (
    <>
    <div>
      <Header />
       <div className="spacer">
        <div className="content-container">
          <div className={style["challenge-main-info"]}>

            <div className={style["challenge-main-info-text"]}>

        <h1>
          {challenge.title}
        </h1>

        <p className={style["subheading"]}>
          {challenge.tagline}
        </p>

        <p>
          {challenge.description}
        </p>

        <div className={style.duration}>
          <FaRegClock /> &nbsp; Duration: {challenge.days} days
        </div>

        <button>Join Challenge</button>

        </div>
        <div className={style["challenge-main-info-image"]}>
          <img src={challenge.cardImage} alt={challenge.title} />
          </div>
        </div>

        <div className={style["challenge-todos"]}>  
        <div className="daily-todos-section">
        <h2>
          Daily To Dos
        </h2>
        <p>
          Check off at least one task a day to keep up your daily streak.
        </p>
        <ul className={style["todo-list"]}>
              {challenge.dailyToDo.map((dailyToDo, index) => (
                <li key={dailyToDo.id} className={style["todo-item"]}>
                  <label className={style["todo-label"]}>
                    <input
                      type="checkbox"
                      checked={checkedItemsDaily[index]}
                      onChange={() => handleCheckboxChangeDaily(index)}
                      className={style["todo-checkbox"]}
                    />
                    <span className={checkedItemsDaily[index] ? style["todo-text"] + " " + style["checked"] : style["todo-text"]}>
                      {dailyToDo.text}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
      </div>
    

      <div className="unique-todos-section">
        <h2>
          Unique To Dos
        </h2>
        <p>
          Finish these tasks for a point boost and a create a lasting impact.
        </p>
        <ul className={style["todo-list"]}>
          {challenge.uniqueToDo.map((uniqueToDo, index) => (
            <li key={uniqueToDo.id} className={style["todo-item"]}>
              <label className={style["todo-label"]}>
                <input
                  type="checkbox"
                  checked={checkedItemsUnique[index]}
                  onChange={() => handleCheckboxChangeUnique(index)}
                  className={style["todo-checkbox"]}
                />
                <span className={checkedItemsUnique[index] ? style["todo-text"] + " " + style["checked"] : style["todo-text"]}>
                  {uniqueToDo.text}
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