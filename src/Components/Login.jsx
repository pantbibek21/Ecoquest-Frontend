import { useState } from "react";
import style from "../Components/loginRegister.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useChallenge } from "../Context/ChallengeContext";

const Login = ({ handleRegisterClick }) => {
  const [email, setEmail] = useState("bibek@gmail.com");
  const [password, setPassword] = useState();
  const [loginMessage, setLoginMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state.from;

  const { login, isAuthenticated } = useAuth();
  const { saveChallengeProgress } = useChallenge();

  const registerHandler = () => {
    handleRegisterClick();
  };

  const fetchUserProgress = async () => {
    const challengeProgressAPI = "http://localhost:3000/challenges/progress/2";
    const response = await fetch(challengeProgressAPI);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    saveChallengeProgress(data);
    console.log("Challange progress", data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit clicked!");
    console.log("Name: " + email);
    console.log("Password: " + password);

    // fake user
    // email: bibek@gmail.com
    // password: test@123

    if (email === "bibek@gmail.com" && password === "bibek") {
      console.log("Logged in successfully");
      setLoginMessage("Logged in successfully!");
      login({ userName: "Bibek" });

      // fetch the progress of the user and store in global context
      fetchUserProgress();
      navigate("/dashboard");
    } else {
      console.log("Your email or password is incorrect!");
      setLoginMessage("Your email or password is incorrect!");
    }
  };

  return (
    <div className={style.card}>
      <h3 className={style.heading}>EcoQuest Login</h3>
      <p className={style.tagline}>Sign in to your account</p>

      <form>
        <div className={style.formField}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={style.formField}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" onClick={submitHandler}>
          Login
        </button>

        <p className={style.note}>
          Don't have an account?{" "}
          <button onClick={registerHandler}>Register</button>
        </p>
      </form>

      {loginMessage && (
        <p
          className={`${style.loginMessage} ${
            isAuthenticated ? style.successMessage : style.errorMessage
          }`}
        >
          {loginMessage}
        </p>
      )}
    </div>
  );
};

export default Login;
