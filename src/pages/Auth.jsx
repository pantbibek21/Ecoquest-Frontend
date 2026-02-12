import style from "../Components/Overlay.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Overlay from "../Components/Overlay";
import Register from "../Components/Register";
import Login from "../Components/Login";
import { useState } from "react";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state.from;

  const [isLoginActive, setIsLoginActive] = useState(
    from === "sign-up" ? false : true,
  );

  const handleRegisterClick = () => {
    setIsLoginActive(false);
  };

  const handleLoginClick = () => {
    setIsLoginActive(true);
  };

  const bgPath = location.state?.backgroundPath;

  const handleClose = () => {
    console.log("I was here");
    // preferred: return to previous page
    if (bgPath) navigate(-1);
    // fallback if user opened /auth directly
    else navigate("/");
  };

  return (
    <>
      <Overlay onClose={handleClose}>
        {!isLoginActive && (
          <Register
            handleLoginClick={handleLoginClick}
            setIsLoginActive={setIsLoginActive}
          />
        )}
        {isLoginActive && <Login handleRegisterClick={handleRegisterClick} />}
      </Overlay>
    </>
  );
};

export default Auth;
