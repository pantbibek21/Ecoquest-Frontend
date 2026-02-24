import Burger from "./Burger.jsx";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleBurger = () => {
    setBurgerOpen(!burgerOpen);
  };

  // Closes menu when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (burgerOpen) setBurgerOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [burgerOpen]);

  // Closes menu when user clicks or taps outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        burgerOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setBurgerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [burgerOpen]);

  return (
    <div>
      <div ref={menuRef}>
        <div className={`navigation ${burgerOpen ? "open" : ""}`}>
          <h3>EcoQuest</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/challenges">Challenges</Link>
            </li>
            <li>
              <Link to="/#how-it-works">How it works</Link>
            </li>
          </ul>

          <h3>Company</h3>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link to="/accessibility">Accessibility</Link>
            </li>
          </ul>
        </div>

        <div className="burger" onClick={toggleBurger}>
          <Burger isOpen={burgerOpen} />
        </div>
      </div>

      <style jsx>{`
        .navigation {
          position: fixed;
          top: 0px;
          left: 0px;
          background-color: #ffffff;
          height: 100%;
          width: 300px;
          padding: 60px 46px;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
          z-index: 10;
        }

        .navigation.open {
          transform: translateX(0); /* slide in */
        }

        .navigation h3 {
          margin-top: 40px;
          margin-bottom: 12px;
        }

        .navigation ul {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
        }

        .navigation li {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
