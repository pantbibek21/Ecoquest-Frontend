import { useState } from "react";
import style from "../Components/loginRegister.module.css";

const Register = ({ handleLoginClick, setIsLoginActive }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [registerMessage, setRegisterMessage] = useState("");

  const loginHandler = () => {
    handleLoginClick();
  };

  const registerUser = async () => {
    const userRegisterAPI = "http://localhost:3000/users/signup";

    const response = await fetch(userRegisterAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      setRegisterMessage(
        "Congrats! 🥳 You are successfully registered! Login now!",
      );
      setTimeout(() => setIsLoginActive(true), 3000);
    }

    console.log(response.status);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className={style.card}>
      <h3 className={style.heading}>EcoQuest Register</h3>
      <p className={style.tagline}>Create your account</p>

      <form>
        <div className={style.formField}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className={style.formField}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className={style.formField}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className={style.formField}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={style.formField}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" onClick={submitHandler}>
          Register
        </button>

        <p className={style.note}>
          Already have an account? <button onClick={loginHandler}>Login</button>
        </p>
      </form>
      {registerMessage && (
        <p className={`${style.loginMessage}`}>{registerMessage}</p>
      )}
    </div>
  );
};

export default Register;
