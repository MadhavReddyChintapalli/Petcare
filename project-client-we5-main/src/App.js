import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Services from "./components/Service";
import ServicesForm from "./components/service-form";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { Router, Location } from "@reach/router";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import OnBoarding from "./components/OnBoarding";
import TermsAndConditions from "./components/TermsAndConditions";

import Register from "./components/Register";
import EventForm from "./components/event-form";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#012169",
    },
    secondary: {
      main: "#F95A4A",
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const res = localStorage.getItem("token");
    setIsAuthenticated(!!res);
  };

  // There are also few routes in home.js
  // Please place them where ever it is appropriate
  const getRoutes = () => {
    checkAuthentication();
    if (isAuthenticated) {
      return (
        <Router>
          <Profile path="/profile" />
          <Contact path="/contact" />
          <OnBoarding path="/on-boarding" />
          <Home path="/*" />
          <Services path="/Services" />
          <ServicesForm path="/ServicesForm" />
          <TermsAndConditions path="/terms-and-conditions" />
        </Router>
      );
    }
    return (
      <Router>
        <Login path="/login" />
        <Register path="/register" />
        <Contact path="/contact" />
        <Landing path="/" />
        <TermsAndConditions path="/terms-and-conditions" />
      </Router>
    );
  };

  if (isAuthenticated === undefined) {
    return <div>Loading..</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Location>
        {() => {
          return (
            <>
              <Header isAuthenticated={isAuthenticated} />
              <main className="main">{getRoutes()}</main>
              <Footer />
            </>
          );
        }}
      </Location>
    </ThemeProvider>
  );
}

export default App;
