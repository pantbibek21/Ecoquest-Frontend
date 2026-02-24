import { useAuth } from "../Context/AuthContext";
import { useChallenge } from "../Context/ChallengeContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../components/Footer";
import style from "./Dashboard.module.css";
import welcome from "../Assets/welcome.png";

const Dashboard = ({ challengeJSON }) => {
  const { user, isAuthenticated } = useAuth();
  const { challengeProgress } = useChallenge();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const registeredChallenges =
    challengeJSON?.filter((challenge) =>
      challengeProgress?.challenges?.some(
        (c) => c.challengeId === challenge.id,
      ),
    ) ?? [];

  const suggestedChallenges =
    challengeJSON?.filter(
      (challenge) =>
        !challengeProgress?.challenges?.some(
          (c) => c.challengeId === challenge.id,
        ),
    ) ?? [];

  // List of all open daily to dos from registered challenges
  const openDailyTodos = registeredChallenges.flatMap((challenge) => {
    const progress = challengeProgress?.challenges?.find(
      (c) => c.challengeId === challenge.id,
    );

    const completedSet = new Set(progress?.dailyCompletedTasks ?? []);

    return (challenge.dailyToDo ?? [])
      .map((task, index) => ({
        ...task,
        challengeId: challenge.id,
        challengeTitle: challenge.title,
        taskNumber: index + 1, // matches backend numbering
      }))
      .filter((task) => !completedSet.has(task.taskNumber));
  });

  return (
    <>
      <Header />
      <div className={style.spacer}>
        <div className={style.container}>
          <div className={style.welcomeSection}>
            <div>
              <h1>Welcome back, {user.userName}!</h1>
              <p>
                We hope you're having a great day and we're so glad to have you
                back. Here's everything that's on your To Do List.
                <br />
                You can do this!
              </p>
            </div>

            <div className={style.welcomeImageWrapper}>
              <img src={welcome} alt="" />
            </div>
          </div>

          <section className={style.todosection}>
            <h2>Your Open Daily To Dos</h2>

            {openDailyTodos.length === 0 ? (
              <p>
                You're all done for today - thank you, for being a EcoQuest
                Hero!
              </p>
            ) : (
              <ul className={style.todoList}>
                {openDailyTodos.map((task, index) => (
                  <li key={index} className={style.todoItem}>
                    <label className={style.todoLabel}>
                      <input type="checkbox" className={style.todoCheckbox} />
                      <span>
                        {task.text} (from:{" "}
                        <Link to={`/challengedetails/${task.challengeId}`}>
                          {task.challengeTitle}
                        </Link>
                        )
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className={style.yourchallenges}>
            <h2>Your Challenges</h2>

            {registeredChallenges.length === 0 ? (
              <p>You are not registered in any challenges yet.</p>
            ) : (
              <div className={style.cardWrapper}>
                {registeredChallenges.map((challenge) => (
                  <div className={style.card} key={challenge.id}>
                    <div className={style.cardImageWrapper}>
                      <img src={challenge.cardImage} />
                    </div>
                    <p className={style.cardHeading}>{challenge.title}</p>
                    <p className={style.cardDescription}>{challenge.tagline}</p>
                    <p className={style.details}>{challenge.days} days</p>
                    <button
                      className={style.secondaryBtn}
                      onClick={() =>
                        navigate(`/challengedetails/${challenge.id}`)
                      }
                    >
                      See Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className={style.recommendedchallenges}>
            <h2>Discover more Challenges</h2>

            {suggestedChallenges.length === 0 ? (
              <p>You are already registered in all challenges. Go you!</p>
            ) : (
              <div className={style.cardWrapper}>
                {suggestedChallenges.map((challenge) => (
                  <div className={style.card} key={challenge.id}>
                    <div className={style.cardImageWrapper}>
                      <img src={challenge.cardImage} />
                    </div>
                    <p className={style.cardHeading}>{challenge.title}</p>
                    <p className={style.cardDescription}>{challenge.tagline}</p>
                    <p className={style.details}>{challenge.days} days</p>
                    <button
                      className={style.secondaryBtn}
                      onClick={() =>
                        navigate(`/challengedetails/${challenge.id}`)
                      }
                    >
                      See Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
