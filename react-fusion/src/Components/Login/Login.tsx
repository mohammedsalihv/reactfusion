import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { auth, provider, signInWithPopup } from "../../Auth/firebase";

const Login: React.FC = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    action === "Sign Up" ? handleSignup() : handleLogin();
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((user: any) => user.email === email)) {
      alert("User already exists! Please login.");
      return;
    }
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login.");
    setAction("Login");
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const validUser = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (validUser) {
      alert("Login successful!");

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ email: validUser.email, name: validUser.username })
      );

      window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ email: user.email, name: user.displayName })
      );
      alert(`Welcome, ${user.displayName}!`);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Google Sign-In Error", error);
      alert("Google Sign-In failed!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>{action}</div>
        <div className={styles.underline}></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          {action === "Sign Up" && (
            <div className={styles.input}>
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                className={styles.icons}
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className={styles.input}>
            <FontAwesomeIcon
              icon={faEnvelope}
              size="lg"
              className={styles.icons}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.input}>
            <FontAwesomeIcon icon={faLock} className={styles.icons} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {action}
          </button>
        </div>
      </form>

      <button onClick={handleGoogleSignIn} className={styles.googleButton}>
        <img src="/Google.png" alt="Google Logo" />
        Sign in with Google
      </button>

      <div className={styles.submitContainer}>
        {action === "Login" && (
          <div className={styles.forgot}>
            Forgot password? <span className={styles.spanMsg}>Click here!</span>
          </div>
        )}
        <div className={styles.toggle}>
          {action === "Login" ? (
            <p>
              Don't have an account?{" "}
              <span
                className={styles.spanMsg}
                onClick={() => setAction("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className={styles.spanMsg}
                onClick={() => setAction("Login")}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
