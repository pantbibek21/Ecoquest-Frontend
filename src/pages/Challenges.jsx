import Header from "../Components/Header";
import style from "../pages/Challenges.module.css";
import "../index.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

import challengeJSON from "../data/challenges.json";
import categoryJSON from "../data/category.json";

const Challenges = () => {
  const [categoryId, setCategoryId] = useState("");
  const [days, setDays] = useState("");

  const navigate = useNavigate();

  const filteredChallenges = challengeJSON.filter((item) => {
    const matchesCategory = !categoryId || item.categoryId === categoryId;
    const matchesDays = !days || item.days === Number(days);
    return matchesCategory && matchesDays;
  });

  function filterCategory(userCategory) {
    return categoryJSON.some((cat) => cat.name === userCategory);
  }

  return (
    <>
      <Header />

      <div className={style.container}>
        <div className={`sectionContainer`}>
          <section className={style.challengeIntroSection}>
            <h2>Find a challenge that fits your everyday life</h2>
            <p>
              Browse sustainability challenges designed to help you build
              eco-friendly habits through small, daily actions. Filter by
              category and choose a challenge that fits your time, lifestyle,
              and interests.
            </p>
          </section>

          <section className={style.filterSection}>
            <p>Filter</p>

            <div className="filters">
              {/* Sort by */}
              <div className={style.selectWrapper}>
                <span className={style.dropdownIcon}>
                  <RiArrowDropDownLine />
                </span>

                <select
                  id="sortBy"
                  name="sortBy"
                  className={style.customSelect}
                >
                  <option value="relevance">Sort by: Relevance</option>
                </select>
              </div>

              {/* Category */}
              <div className={style.selectWrapper}>
                <span className={style.dropdownIcon}>
                  <RiArrowDropDownLine />
                </span>

                <select
                  id="category"
                  name="category"
                  className={style.customSelect}
                  value={categoryId}
                  onChange={(e) =>
                    setCategoryId(e.target.value ? Number(e.target.value) : "")
                  }
                >
                  <option value="">Categories</option>
                  {categoryJSON.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Days */}

              <div className={style.selectWrapper}>
                <span className={style.dropdownIcon}>
                  <RiArrowDropDownLine />
                </span>

                <select
                  id="days"
                  name="days"
                  className={style.customSelect}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                >
                  <option value="">Duration</option>
                  <option value="7">7 days</option>
                  <option value="10">10 days</option>
                  <option value="15">15 days</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Wrapper holding all step cards */}
        <div className={style.cardWrapper}>
          {filteredChallenges.map((item) => {
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
                <button className={style.secondaryBtn} onClick={() => navigate(`/challengedetails/${item.id}`)}>See Details</button>
                <button>Join Challenge</button>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Challenges;
