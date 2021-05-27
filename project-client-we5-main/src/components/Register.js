import { useState } from "react";
import { navigate } from "@reach/router";
import ImgLoginCard from "../assets/login-dog.svg";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { handleRegister } from "../api/register";
import "../styles/login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      const resp = await handleRegister(name, username, password);
      if (resp?.token) {
        localStorage.setItem("token", resp?.token);
      }
      navigate("/on-boarding");
    } catch (error) {
      setErrorMessage(error?.response?.data?.error || error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div id="Login">
      <Grid container spacing={3} className="login-inner-container">
        <Grid item sm={12} md={6} className="intro-left-card">
          <div className="tag-line">
            <img src={ImgLoginCard} className="login-image" alt="login" />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="intro-right-card">
          <div className="greetings">Hello,</div>
          <div className="greetings-tag-line">
            Please create an account to enjoy wonderful features!
          </div>
          <div className="login-hint"></div>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLogin();
            }}
          >
            <input
              className="custom-input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="custom-input"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="custom-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error-message">{errorMessage}</div>
            <Button
              type="submit"
              className="login-btn"
              style={username && password ? { opacity: 1 } : { opacity: 0.4 }}
              disabled={!(username && password) || isLoading}
            >
              {isLoading ? (
                <CircularProgress style={{ height: 20, width: 20 }} />
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <div className="need-help">
            Already have an account?
            <a href="/login" className="contact-link">
              Login
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
