import { useState } from "react";
import style from "../Components/Header.module.css";
import Navigation from "./Navigation.jsx";

const Header = () => {
  
  return (
    <div className="wrapper">
      <header>
        <nav>
          <div className="burgernav">
            <Navigation />
          </div>
        </nav>
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
}

export default Header;
