import { useState } from "react";
import { navigate } from "@reach/router";
import ImgLoginCard from "../assets/login-dog.svg";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { handleLogin as login } from "../api/login";
import jwtDecode from "jwt-decode";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      const resp = await login(username, password);
      if (resp?.token) {
        localStorage.setItem("token", resp?.token);
      }
      const tokenDetails = jwtDecode(resp?.token);
      localStorage.setItem(
        "isAdmin",
        !!tokenDetails?.user?.isAdmin ? "true" : "false"
      );
      if (tokenDetails?.user?.isOnBoarded) {
        navigate("/");
      } else {
        navigate("/on-boarding");
      }
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
          <div className="greetings">Welcome Back,</div>
          <div className="greetings-tag-line">Good to see you again!</div>
          <div className="login-hint">Please login to access your account.</div>
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
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="custom-input"
              placeholder="password"
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
                "Login"
              )}
            </Button>
          </form>
          <div className="terms-conditions">
            *By Logging in, you are accepting all terms and conditions!
          </div>
          <div className="need-help">
            Don't have an account?
            <a href="/register" className="contact-link">
              Create Account
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
