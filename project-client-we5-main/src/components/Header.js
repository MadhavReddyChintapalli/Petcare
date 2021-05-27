import { AppBar, Toolbar, Button } from "@material-ui/core";
import { navigate } from "@reach/router";
import ImgLogo from "../assets/logo.png";
import "../styles/header.css";

const Header = ({ isAuthenticated }) => {
  const navigateTo = (path) => () => navigate(path);

  const handleLogout = () => {
    try {
      localStorage.clear();
    }
    catch (error) { }
    navigate("/login");
  };

  return (
    <div>
      <AppBar position="fixed" color="neutral">
        <Toolbar className="header-toolbar">
          <Button
            color="primary"
            className="header-logo-btn"
            onClick={navigateTo("/")}
          >
            <img src={ImgLogo} className="logo" />
          </Button>
          {isAuthenticated ? (
            <div>
              <Button color="primary" onClick={navigateTo("/")}>
                Home
              </Button>
              <Button color="primary" onClick={navigateTo("/profile")}>
                Profile
              </Button>
              <Button color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button color="primary" onClick={navigateTo("/login")}>
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
