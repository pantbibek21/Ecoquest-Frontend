import { Link } from "react-router-dom";
import style from "../Components/Header.module.css";
import Navigation from "./Navigation.jsx";
import Logo from "../Assets/logo.png";

const Header = () => {
  return (
    <div className="wrapper">
      <header>
        <nav>
          <div className="burgernav">
            <Navigation />
          </div>
        </nav>
        <div>
          <Link to="/home">
            <img className="headerlogo" src={Logo} alt="Logo of EcoQuest" />
          </Link>
        </div>
        <div className={style.buttons}>
          <button className={`${style.button} ${style["sign-up"]}`}>
            {""}
            Sign Up
          </button>
          <button className={`${style.button} ${style["login"]}`}>Login</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
