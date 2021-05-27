import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Remove";
import { getUser, updateUser } from "../api/user";
import { navigate, useLocation } from "@reach/router";
import "../styles/OnBoarding.css";
import TextField from '@material-ui/core/TextField';
import moment from "moment";
import jwtDecode from "jwt-decode";
const OnBoarding = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [dateOfBirth, setdateOfBirth] = useState('')
  const [gender, setgender] = useState('')
  const [profilePictureUrl, setprofilePictureUrl] = useState('')


  const loadCurrentUser = async () => {
    const token = localStorage.getItem("token");
    const tokenDetails = jwtDecode(token);
    setCurrentUser(tokenDetails?.user?.id);
    console.log(tokenDetails?.user?.id)
    try {
      const resp = await getUser(tokenDetails?.user?.id);
      console.log(!resp?.[0]?.isOnBoarded)
      if (!resp?.[0]?.isOnBoarded) {
        setname(resp?.[0]?.name)
        setemail(resp?.[0]?.email)
        setdateOfBirth(resp?.[0]?.dateOfBirth)
        setgender(resp?.[0]?.gender)
      }
      else {
        navigate("/");
      }

    }
    catch (error) { }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const handleSubmit = async () => {
    try {
      if (currentUser) {
        await updateUser({
          isOnBoarded: true,
          email,
          gender,
          name
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isCreateBtnEnabled = name && email && gender;

  return (<div>
    <Paper className="paper-container">
      <div className="form-banner">
      </div>
      <label>Name </label>
      <input
        id="outlined-basic"
        label="Name"
        variant="outlined"
        className="custom-form-text-input"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <label>Email </label>
      <input
        id="outlined-basic"
        label="Email"
        variant="outlined"
        className="custom-form-text-input"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <label>Gender </label>
      <input
        id="outlined-basic"
        label="Name"
        variant="outlined"
        className="custom-form-text-input"
        value={gender}
        onChange={(e) => setgender(e.target.value)}
      />

      <Button
        color="primary"
        variant="contained"
        className="create-btn"
        onClick={handleSubmit}
        disabled={!isCreateBtnEnabled}
      >
        Update
      </Button>
      <Button
        color="primary"
        variant="contained"
        className="create-btn"
        onClick={() => navigate("/")}
      >
        Do it later
      </Button>

    </Paper>
  </div>
  )
};

export default OnBoarding;
