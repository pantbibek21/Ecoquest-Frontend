import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../Context/AuthContext";
import { useChallenge } from "../Context/ChallengeContext";
import Header from "../Components/Header";
import style from "../pages/ChallengeDetails.module.css";
import "../index.css";
import Footer from "../components/Footer";
import { FaRegClock, FaCheckCircle, FaFire } from "react-icons/fa";

const ChallengeDetails = ({ challengeJSON }) => {
  const { challengeId } = useParams();
  const { isAuthenticated, user } = useAuth();

  // NOTE: If your ChallengeContext exposes a refresh function, we use it.
  // If not, this code still works because we have localRegistered.
  const { challengeProgress, refreshChallengeProgress } = useChallenge?.() || {
    challengeProgress: null,
    refreshChallengeProgress: null,
  };

  const [message, setMessage] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  // ✅ local state so UI updates immediately after register
  const [localRegistered, setLocalRegistered] = useState(false);

  // Always render challenge details from challengeJSON (public data)
  const challenge = useMemo(() => {
    return challengeJSON?.find((item) => item.id === Number(challengeId));
  }, [challengeJSON, challengeId]);

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
  const progressForThisChallenge = useMemo(() => {
    return challengeProgress?.challenges?.find(
      (c) => c.challengeId === Number(challengeId),
    );
  }, [challengeProgress, challengeId]);

  console.log(JSON.stringify(challengeProgress));

  // If a challenge exists in challengeProgress, it means it's registered
  const isRegisteredFromContext = Boolean(progressForThisChallenge);

  // ✅ single source of truth for rendering
  const registered = isRegisteredFromContext || localRegistered;

  const btnContent = registered ? "Registered!" : "Join challenge";
  const isBtnDisabled = registered;

  // Placeholder values until fields are added to MongoDB
  const streak = progressForThisChallenge?.streak ?? 0;

  //Calculate progress for challenge
  const progressPercent = useMemo(() => {
    const totalTasks = checkedItemsDaily.length + checkedItemsUnique.length;
    if (totalTasks === 0) return 0;

    const completedCount =
      checkedItemsDaily.filter(Boolean).length +
      checkedItemsUnique.filter(Boolean).length;

    return Math.min((completedCount / totalTasks) * 100, 100);
  }, [checkedItemsDaily, checkedItemsUnique]);

  // Placeholder value until field is added to MongoDB
  const totalCompleted = useMemo(() => {
    return (
      checkedItemsDaily.filter(Boolean).length +
      checkedItemsUnique.filter(Boolean).length
    );
  }, [checkedItemsDaily, checkedItemsUnique]);

  // When switching to a different challenge, reset checkbox arrays to correct length
  useEffect(() => {
    setCheckedItemsDaily(dailyToDos.map(() => false));
    setCheckedItemsUnique(uniqueToDos.map(() => false));
  }, [challengeId, dailyToDos.length, uniqueToDos.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!progressForThisChallenge) return;

    const dailyCompleted = (
      progressForThisChallenge.dailyCompletedTasks ?? []
    ).map(Number);
    const uniqueCompleted = (
      progressForThisChallenge.uniqueCompletedTasks ?? []
    ).map(Number);

    const dailySet = new Set(dailyCompleted);
    const uniqueSet = new Set(uniqueCompleted);

    // IMPORTANT: this assumes dailyToDo.id and uniqueToDo.id match what backend stores
    setCheckedItemsDaily(dailyToDos.map((t) => dailySet.has(Number(t.id))));
    setCheckedItemsUnique(uniqueToDos.map((t) => uniqueSet.has(Number(t.id))));
  }, [progressForThisChallenge, dailyToDos, uniqueToDos]);

  // ✅ Enable inputs only if registered and not completed
  useEffect(() => {
    if (!registered) {
      setIsInputDisabled(true);
      return;
    }

    const status = progressForThisChallenge?.status;
    if (status === "Completed") setIsInputDisabled(true);
    else setIsInputDisabled(false); // Registered or Ongoing
  }, [registered, progressForThisChallenge]);

  const resetMessage = () => {
    setTimeout(() => setMessage(""), 3000);
  };

  const postChallengeTask = async (taskId, completed, taskType) => {
    if (!isAuthenticated || !user?.userId) return;

    const ChallengeTaskAPI = "http://localhost:3000/challenges/progress";

    try {
      const response = await fetch(ChallengeTaskAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          challengeId: Number(challengeId),
          taskType,
          taskId, // ✅ real task id
          completed,
        }),
      });

      console.log("Task POST:", response.status);
    } catch (e) {
      console.error("Task POST failed:", e);
    }
  };

  const handleCheckboxChangeDaily = async (index) => {
    const updated = [...checkedItemsDaily];
    updated[index] = !updated[index];
    setCheckedItemsDaily(updated);

    const taskId = dailyToDos[index]?.id; // ✅ real id
    if (taskId == null) return;

    postChallengeTask(taskId, updated[index], "daily");
  };

  const handleCheckboxChangeUnique = async (index) => {
    const updated = [...checkedItemsUnique];
    updated[index] = !updated[index];
    setCheckedItemsUnique(updated);

    const taskId = uniqueToDos[index]?.id; // ✅ real id
    if (taskId == null) return;

    postChallengeTask(taskId, updated[index], "unique");
  };

  const handleJoinChallenge = async () => {
    if (!isAuthenticated) {
      setMessage("You need to be logged in first 🙂!");
      resetMessage();
      return;
    }

    try {
      const challengeRegisterAPI = "http://localhost:3000/challenges/register";

      const response = await fetch(challengeRegisterAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          challengeId: Number(challengeId),
        }),
      });

      console.log("Register POST:", response.status);

      if (!response.ok) {
        setMessage("Registration failed. Please try again.");
        resetMessage();
        return;
      }

      // ✅ instant UI update (button + enable checkboxes)
      setLocalRegistered(true);
      setIsInputDisabled(false);

      setMessage("Challenge registered!🥳");
      resetMessage();

      // ✅ best: refresh context so isRegisteredFromContext becomes true
      if (typeof refreshChallengeProgress === "function") {
        await refreshChallengeProgress(user.userId);
      }
    } catch (e) {
      console.error("Registration failed:", e);
      setMessage("Network error. Please try again.");
      resetMessage();
    }
  };

  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const diff = midnight - now;

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
      2,
      "0",
    );

    return { diff, formatted: `${hours}:${minutes}` };
  };

  useEffect(() => {
    if (!isAuthenticated || !user?.userId) return;
    if (typeof refreshChallengeProgress !== "function") return;

    refreshChallengeProgress(user.userId);
  }, [isAuthenticated, user?.userId, refreshChallengeProgress]);

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
                <p className={style.subheading}>{challenge.tagline}</p>
                <p>{challenge.description}</p>

                <div className={style.duration}>
                  <FaRegClock /> &nbsp; Duration: {challenge.days} days
                </div>

                <button onClick={handleJoinChallenge} disabled={isBtnDisabled}>
                  {btnContent}
                </button>

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

                {isAuthenticated && registered && (
                  <>
                    <div className={style.progressSection}>
                      <h3>Fortschritt</h3>

                      <div className={style.progressBarWrapper}>
                        <div
                          className={style.progressBar}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <p className={style.progressPercent}>
                        {Math.round(progressPercent)} %
                      </p>
                    </div>

                    <div className={style.statsRow}>
                      <div className={style.stats}>
                        <div className={style.iconWrapper}>
                          <FaCheckCircle color="#62853D" size="32px" />
                        </div>
                        <div className={style.statsLabel}>
                          <p>Completed To Dos</p>
                          <strong>{totalCompleted}</strong>
                        </div>
                      </div>

                      <div className={style.stats}>
                        <div className={style.iconWrapper}>
                          <FaFire color="#BC8630" size="32px" />
                        </div>
                        <div className={style.statsLabel}>
                          <p>Streak</p>
                          <strong>{streak}</strong>
                        </div>
                      </div>
                    </div>
                  </>
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

                <p className={style.countdown}>
                  Your Daily To Dos will be reset in{" "}
                  <strong>{getTimeUntilMidnight().formatted} hours</strong>
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
                              ? `${style["todo-text"]} ${style.checked}`
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
                              ? `${style["todo-text"]} ${style.checked}`
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
