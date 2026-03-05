import { useState } from "react";
import style from "../Components/loginRegister.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useChallenge } from "../Context/ChallengeContext";

const Login = ({ handleRegisterClick }) => {
  const [email, setEmail] = useState("jack@gmail.com");
  const [password, setPassword] = useState("iamjack");
  const [loginMessage, setLoginMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state.from;

  const { login, isAuthenticated, user } = useAuth();
  const { saveChallengeProgress } = useChallenge();

  const registerHandler = () => {
    handleRegisterClick();
  };

  const fetchUserProgress = async (userId) => {
    console.log(user);
    const challengeProgressAPI = `http://localhost:3000/challenges/progress/${userId}`;
    const response = await fetch(challengeProgressAPI);

    // if (!response.ok) {
    //   throw new Error("Failed to fetch data");
    // }

    const data = await response.json();
    console.log(data);
    saveChallengeProgress(data);
    console.log("Challange progress", data);
  };

  const loginUser = async () => {
    const userLoginAPI = "http://localhost:3000/users/login";

    try {
      const response = await fetch(userLoginAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password, // keep as string (recommended)
        }),
      });

      // Safely parse JSON (backend might not always return JSON)
      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      // ✅ Success
if (response.ok) {
  setLoginMessage("Logged in successfully! 🥳");

  console.log("FULL LOGIN RESPONSE:", data);

  if (!data) {
    setLoginMessage("Invalid server response.");
    return;
  }

  const userId = data.userId ?? data.user?.userId;
  const userName = data.userName ?? data.user?.userName;
  const email = data.email ?? data.user?.email;
  const firstName = data.firstName ?? data.user?.firstName;
  const lastName = data.lastName ?? data.user?.lastName;

  console.log("Extracted userId:", userId);
  console.log("Extracted userName:", userName);
  console.log("Extracted email:", email);
  console.log("Extracted firstName:", firstName);
  console.log("Extracted lastName:", lastName);

  if (!userId) {
    setLoginMessage("Login response missing userId.");
    return;
  }

  login({
    userName,
    userId,
    email,
    firstName,
    lastName,
  });

  await fetchUserProgress(userId);

  navigate("/dashboard");
  return;
}

      // ❌ HTTP error (e.g., 401, 400, 500)
      const message =
        data?.message ||
        (response.status === 401
          ? "Invalid email or password."
          : `Failed to login (Status ${response.status})`);

      setLoginMessage(message);
    } catch (error) {
      // ❌ Network error / fetch failed
      console.error("Login error:", error);
      setLoginMessage("Unable to reach the server. Please try again later.");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit clicked!");
    console.log("Name: " + email);
    console.log("Password: " + password);
    loginUser();
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
