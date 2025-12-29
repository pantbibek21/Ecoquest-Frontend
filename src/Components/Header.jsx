import style from "../Components/Header.module.css";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  return (
    <div className="wrapper">
      <header>
        <nav>
          <div className={style.menu}>
            <IoMenu />
          </div>
        </nav>

        <div className={style.buttons}>
          <button className={`${style.button} ${style["sign-up"]}`}>
            {" "}
            Sign Up
          </button>
          <button className={`${style.button} ${style["login"]}`}>Login</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
