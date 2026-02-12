import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useChallenge } from "../Context/ChallengeContext";
import Header from "../Components/Header";
import style from "../pages/ChallengeDetails.module.css";
import "../index.css";
import Footer from "../components/Footer";
import { FaRegClock } from "react-icons/fa";

const ChallengeDetails = ({ challengeJSON }) => {
  const { challengeId } = useParams();
  const { isAuthenticated } = useAuth();
  const { challengeProgress } = useChallenge();

  const [message, setMessage] = useState("");
  const [isInputDisabled, setisInputDisabled] = useState(true);

  // Always render challenge details from challengeJSON (public data)
  const challenge = challengeJSON?.find(
    (item) => item.id === Number(challengeId),
  );

  // Safe fallback so hooks don't break when challenge isn't loaded yet
  const todos = challenge?.toDo ?? [];

  const [checkedItemsDaily, setCheckedItemsDaily] = useState(() =>
    todos.map(() => false),
  );

  const [checkedItemsUnique, setCheckedItemsUnique] = useState(() =>
    todos.map(() => false),
  );

  // Progress exists only for registered challenges (private/user-specific data)
  const progressForThisChallenge = challengeProgress?.challenges?.find(
    (c) => c.challengeId === Number(challengeId),
  );

  // If a challenge exists in challengeProgress, it means it's registered
  const isRegistered = Boolean(progressForThisChallenge);

  const btnContent = isRegistered ? "Registered!" : "Join challenge";
  const isBtnDisabled = isRegistered;

  // When switching to a different challenge, reset checkbox arrays to correct length
  useEffect(() => {
    setCheckedItemsDaily(todos.map(() => false));
    setCheckedItemsUnique(todos.map(() => false));
  }, [challengeId, todos.length]);

  // If registered, restore checked state from completedTasks
  useEffect(() => {
    if (!progressForThisChallenge) return;

    const completedTasks = progressForThisChallenge.completedTasks ?? [];
    const initialCheckedState = todos.map((_, index) =>
      completedTasks.includes(index + 1),
    );

    setCheckedItemsDaily(initialCheckedState);
  }, [progressForThisChallenge, todos]);

  // Enable inputs only if registered and not completed
  useEffect(() => {
    if (!isRegistered) {
      setisInputDisabled(true);
      return;
    }

    const status = progressForThisChallenge?.status;
    if (status === "Completed") setisInputDisabled(true);
    else setisInputDisabled(false); // Registered or Ongoing
  }, [isRegistered, progressForThisChallenge]);

  const postChallengeTask = async (ChallengeTaskId, status) => {
    const ChallengeTaskAPI = "http://localhost:3000/challenges/progress";

    const response = await fetch(ChallengeTaskAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 2,
        challengeId: Number(challengeId),
        taskId: ChallengeTaskId,
        completed: status,
      }),
    });

    console.log(response.status);
  };

  const handleCheckboxChangeDaily = async (index) => {
    const updated = [...checkedItemsDaily];
    updated[index] = !updated[index];
    setCheckedItemsDaily(updated);

    // POST single task completion to backend
    postChallengeTask(index + 1, updated[index]);
  };

  const handleCheckboxChangeUnique = (index) => {
    const updated = [...checkedItemsUnique];
    updated[index] = !updated[index];
    setCheckedItemsUnique(updated);
  };

  const resetMessage = () => {
    setTimeout(() => setMessage(""), 3000);
  };

  const handleJoinChallenge = async () => {
    if (isAuthenticated) {
      setMessage("Challenge registered!🥳");
      resetMessage();

      const challengeRegisterAPI = "http://localhost:3000/challenges/register";

      const response = await fetch(challengeRegisterAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 2,
          challengeId: Number(challengeId),
        }),
      });

      console.log(response.status);
    } else {
      setMessage("You need to be logged in first 🙂!");
      resetMessage();
    }
  };

  if (!challenge) {
    return <p>Challenge nicht gefunden</p>;
  }

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
                <button onClick={handleJoinChallenge} disabled={isBtnDisabled}>
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
                  {todos.map((toDo, index) => (
                    <li key={toDo.id} className={style["todo-item"]}>
                      <label className={style["todo-label"]}>
                        <input
                          disabled={isInputDisabled}
                          type="checkbox"
                          checked={checkedItemsDaily[index] || false}
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
                  {todos.map((toDo, index) => (
                    <li key={toDo.id} className={style["todo-item"]}>
                      <label className={style["todo-label"]}>
                        <input
                          disabled={isInputDisabled}
                          type="checkbox"
                          checked={checkedItemsUnique[index] || false}
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
