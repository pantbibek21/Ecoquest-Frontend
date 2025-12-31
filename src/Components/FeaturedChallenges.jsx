import style from "../Components/FeaturedChallenges.module.css";
import challengesJSON from "../data/challenges.json";
import categoryJSON from "../data/category.json";
import { useState } from "react";
import { Link } from "react-router-dom";

const FeaturedChallenges = () => {
  const category = categoryJSON;
  const challenge = challengesJSON;

  return (
    <div className={style.howItWorksSection}>
      {/* Layout container for consistent page spacing */}
      <div className="sectionContainer">
        <div className={style.sectionCard}>
          {/* Section heading + tagline */}
          <h2 className={style.sectionHeading}>Featured Challenges</h2>
          <p className={style.sectionTagline}>Find your next challenge</p>

          {/* Wrapper holding all step cards */}
          <div className={style.cardWrapper}>
            {challenge.map((item) => {
              return (
                <div className={style.card} key={item.categoryId}>
                  <div className={style.cardImageWrapper}>
                    <img src={item.cardImage} />
                  </div>
                  <p className={style.cardHeading}>{item.title}</p>
                  <p className={style.cardDescription}>{item.tagline}</p>
                  <p className={style.details}>
                    {item.days} days | {item.participants} participants
                  </p>
                  <button>Join Challenge</button>
                </div>
              );
            })}
          </div>

          <Link
            to="/challenges"
            style={{ textDecoration: "none" }}
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "instant" })
            }
          >
            <button className={style.exploreChallengeBtn}>
              Explore all Challenges
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChallenges;
