import { Link, useLocation } from "react-router-dom";
import style from "../Components/Header.module.css";
import Navigation from "./Navigation.jsx";
import Logo from "../Assets/logo.png";
import { useAuth } from "../Context/AuthContext.jsx";
import UserMenu from "./UserMenu.jsx";

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  console.log(user);
  console.log(isAuthenticated);

  return (
    <div className="wrapper">
      <header>
        <nav>
          <div className="burgernav">
            <Navigation />
          </div>
        </nav>
        <div>
          <Link to="/">
            <img className={style.headerlogo} src={Logo} alt="Logo of EcoQuest" />
          </Link>
        </div>
        <div className={style.buttons}>
          {isAuthenticated && (
            < UserMenu />
          )}
          {!isAuthenticated && (
            <>
              <Link
                to="/auth"
                state={{
                  from: "sign-up",
                  backgroundPath:
                    location.pathname + location.search + location.hash,
                }}
              >
                <button className={`${style.button} ${style["sign-up"]}`}>
                  {""}
                  Sign Up
                </button>
              </Link>
              <Link
                to="/auth"
                state={{
                  from: "login",
                  backgroundPath:
                    location.pathname + location.search + location.hash,
                }}
              >
                <button className={`${style.button} ${style["login"]}`}>
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
