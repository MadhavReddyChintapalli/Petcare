import { getUser, updateUser } from "../api/user";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { navigate, useLocation } from "@reach/router";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState("");



  const loadCurrentUser = async () => {
    const token = localStorage.getItem("token");
    const tokenDetails = jwtDecode(token);
    console.log(tokenDetails?.user?.id)
    try {
      const resp = await getUser(tokenDetails?.user?.id);
      setCurrentUser(resp?.[0])
    }

    catch (error) { }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);



  return (<div>
    <ul>Profile</ul>
    <li> Name : {currentUser.name}</li>
    <li> Email : {currentUser.email}</li>
    <li> Gender : {currentUser.gender}</li>
    <Button
      color="primary"
      variant="contained"
      className="create-btn"
      onClick={() => navigate("/on-boarding")}
    >
      Edit Profile
      </Button>
  </div>
  )
};

export default Profile;
