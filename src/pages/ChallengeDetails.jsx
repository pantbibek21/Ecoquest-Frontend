import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useChallenge } from "../Context/ChallengeContext";
import Header from "../Components/Header";
import style from "../pages/ChallengeDetails.module.css";
import "../index.css";
import Footer from "../components/Footer";
import { FaRegClock, FaCheckCircle, FaFire } from "react-icons/fa";

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
  const dailyToDos = challenge?.dailyToDo ?? [];
  const uniqueToDos = challenge?.uniqueToDo ?? [];

  const [checkedItemsDaily, setCheckedItemsDaily] = useState(() =>
    dailyToDos.map(() => false),
  );

  const [checkedItemsUnique, setCheckedItemsUnique] = useState(() =>
    uniqueToDos.map(() => false),
  );

  // Progress exists only for registered challenges (private/user-specific data)
  const progressForThisChallenge = challengeProgress?.challenges?.find(
    (c) => c.challengeId === Number(challengeId),
  );

  // If a challenge exists in challengeProgress, it means it's registered
  const isRegistered = Boolean(progressForThisChallenge);

  const btnContent = isRegistered ? "Registered!" : "Join challenge";
  const isBtnDisabled = isRegistered;

    // Placeholder values until fields are added to MongoDB
  const streak = progressForThisChallenge?.streak ?? 0;

    //Calculate progress for challenge
  const calculateProgress = () => {
  if (!challenge || !progressForThisChallenge?.startedAt) return 0;

  const start = new Date(progressForThisChallenge.startedAt);
  const today = new Date();

  const diffTime = today - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const progress = Math.min(
    (diffDays / challenge.days) * 100,
    100
  );

  return Math.max(progress, 0);
};

  const progressPercent = calculateProgress();

  // Placeholder value until field is added to MongoDB
  const totalCompleted = 10;


  // When switching to a different challenge, reset checkbox arrays to correct length
  useEffect(() => {
    setCheckedItemsDaily(dailyToDos.map(() => false));
    setCheckedItemsUnique(uniqueToDos.map(() => false));
  }, [challengeId, dailyToDos.length, uniqueToDos.length]);

  // If registered, restore checked state from completedTasks
  useEffect(() => {
    if (!progressForThisChallenge) return;

    const completedTasks = progressForThisChallenge.completedTasks ?? [];
    const initialCheckedStateDaily = dailyToDos.map((_, index) =>
      completedTasks.includes(index + 1),
    );

    const initialCheckedStateUnique = uniqueToDos.map((_, index) =>
      completedTasks.includes(index + 1),
    );

    setCheckedItemsDaily(initialCheckedStateDaily);
    setCheckedItemsUnique(initialCheckedStateUnique);
  }, [progressForThisChallenge, dailyToDos, uniqueToDos]);




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

  // Countdown bis Mitternacht
  const [timeLeft, setTimeLeft] = useState("");

  const getTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date();

  midnight.setHours(24, 0, 0, 0);

  const diff = midnight - now;

  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(
    Math.floor((diff / (1000 * 60)) % 60)
  ).padStart(2, "0");

  return { diff, formatted: `${hours}:${minutes}` };
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

                {isAuthenticated && isRegistered && (
              <><div className={style.progressSection}>
                    <h3>Fortschritt</h3>

                    <div className={style.progressBarWrapper}>
                      <div
                        className={style.progressBar}
                        style={{ width: `${progressPercent}%` }} />
                    </div>

                    <p className={style.progressPercent}>
                      {Math.round(progressPercent)} %
                    </p>
                  </div><div className={style.statsRow}>
                      <div className={style.stats}>
                        <div className={style.iconWrapper}>
                        <FaCheckCircle color="#62853D" size="32px"/> 
                        </div>
                        <div className={style.statsLabel}>
                        <p>Completed To Dos</p>
                        <strong>{totalCompleted}</strong>
                        </div>
                      </div>

                      <div className={style.stats}>
                        <div className={style.iconWrapper}>
                        <FaFire color="#BC8630" size="32px"/>
                        </div>
                        <div className={style.statsLabel}>
                         <p>Streak</p><strong>{streak}</strong>
                         </div>
                      </div>
                    </div></>

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
                <p className={style["countdown"]}>
                  Your Daily To Dos will be reset in <strong>{getTimeUntilMidnight().formatted} hours</strong>
                </p>

                <ul className={style["todo-list"]}>
                  {dailyToDos.map((dailyToDo, index) => (
                    <li key={dailyToDo.id} className={style["todo-item"]}>
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
                          {dailyToDo.text}
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
                  {uniqueToDos.map((uniqueToDo, index) => (
                    <li key={uniqueToDo.id} className={style["todo-item"]}>
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
