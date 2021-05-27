import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@material-ui/core";
import { updateLostPetInfo } from "../../api/lostpet";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const breeds = [
  {
    title: "Pomoranian",
  },
  {
    title: "Husky",
  },
  {
    title: "Lab",
  },
  {
    title: "Pitbull",
  },
  {
    title: "Mini Pom",
  },
  {
    title: "Shitzoo",
  },
  {
    title: "Hound",
  },
  {
    title: "American bulley",
  },
];

export const LostPets = () => {
  const classes = useStyles();

  const [breed, setBreed] = useState("");
  const [name, setName] = useState("");
  const [belongsTo, setBelongsTo] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [color, setColor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBreed = (e) => {
    setBreed(e.target.innerHTML);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleBelonsTo = (e) => {
    setBelongsTo(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleLastSeen = (e) => {
    setLastSeen(e.target.value);
  };
  const handleColor = (e) => {
    setColor(e.target.value);
  };
  const handlePhoneNumber = (phNumber) => {
    setPhoneNumber(phNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber && (phoneNumber.length >= 11 || phoneNumber.length <= 17)) {
      const data = {
        name,
        phoneNumber: phoneNumber.slice(
          phoneNumber.length - 10,
          phoneNumber.length
        ),
        description,
        lastSeenAt: lastSeen,
        color,
        belongsTo: belongsTo || undefined,
        age,
        breed,
      };
      if (await updateLostPetInfo(data)) alert("Details uploaded successfully");
      else alert("Error while uploading info");
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <div>
        <TextField
          id="lost-pet-name"
          onChange={handleName}
          value={name}
          placeholder="Pet Name"
          variant="outlined"
        />
        <TextField
          id="lost-pet-belongs-to"
          onChange={handleBelonsTo}
          value={belongsTo}
          label="Belongs To"
          variant="outlined"
          helperText="This should be the system Id"
        />
      </div>
      <div>
        <TextField
          id="lost-pet-age"
          label="Age (In Years)"
          onChange={handleAge}
          value={age}
          required
          type="number"
          error={!age}
          helperText={!age ? "Age is a required field" : ""}
          variant="outlined"
        />
        <TextField
          required
          error={!description}
          onChange={handleDescription}
          value={description}
          helperText={!description ? "Description is a required field" : ""}
          id="lost-pet-description"
          label={"Description"}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="lost-pet-last-seen"
          label="Last Seen At"
          variant="outlined"
          onChange={handleLastSeen}
          value={lastSeen}
        />
        <TextField
          id="lost-pet-color"
          label={"Color"}
          required
          variant="outlined"
          error={!color}
          onChange={handleColor}
          value={color}
          helperText={!color ? "Color is a required field" : ""}
        />
      </div>
      <div>
        <Autocomplete
          id="breed-combo-box"
          variant="outlined"
          options={breeds}
          onChange={handleBreed}
          getOptionLabel={(option) => {
            return option.title;
          }}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              error={!breed}
              helperText={!breed ? "Breed is a required field" : ""}
              {...params}
              required
              label="Breed"
              variant="outlined"
            />
          )}
        />
        <PhoneInput
          country={"ca"}
          required
          id="lost-pet-phone-number"
          placeholder={"Should"}
          onChange={handlePhoneNumber}
          value={phoneNumber}
        />
        <span
          htmlFor={"lost-pet-phone-number"}
          style={{
            marginLeft: "10px",
            color: "red",
            fontSize: "14px",
          }}
        >
          {phoneNumber && (phoneNumber.length < 11 || phoneNumber.length > 17)
            ? "Phone number must be greater than 10 characters"
            : !phoneNumber
            ? "Phone Number is Mandatory"
            : ""}
        </span>
      </div>
      <Button color="primary" variant="outlined" type="submit">
        Submit
      </Button>
    </form>
  );
};
