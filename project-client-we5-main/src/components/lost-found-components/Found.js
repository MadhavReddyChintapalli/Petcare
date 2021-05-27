import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "react-phone-input-2/lib/style.css";
import { Button } from "@material-ui/core";
import { updateFoundPetInfo } from "../../api/foundpet";
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

export const FoundPets = () => {
  const classes = useStyles();

  const [breed, setBreed] = useState("");
  const [foundAt, setFoundAt] = useState("");
  const [rackNumber, setRackNumber] = useState("");
  const [possibleAge, setPossibleAge] = useState("");
  const [description, setDescription] = useState("");
  const [foundBy, setFoundBy] = useState("");
  const [color, setColor] = useState("");

  const handleBreed = (e) => {
    setBreed(e.target.innerHTML);
  };
  const handleFoundAt = (e) => {
    setFoundAt(e.target.value);
  };
  const handleRackNumber = (e) => {
    setRackNumber(e.target.value);
  };
  const handleAge = (e) => {
    setPossibleAge(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleFoundBy = (e) => {
    setFoundBy(e.target.value);
  };
  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      breed,
      foundAt,
      rackNumber,
      possibleAge,
      description,
      foundBy,
      color,
    };

    if (await updateFoundPetInfo(data)) alert("Details uploaded successfully");
    else alert("Error while uploading info");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <div>
        <TextField
          id="found-pet-at"
          onChange={handleFoundAt}
          value={foundAt}
          placeholder="Found At"
          variant="outlined"
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
        <TextField
          id="found-pet-by"
          label={"Found By"}
          required
          variant="outlined"
          error={!foundBy}
          onChange={handleFoundBy}
          value={foundBy}
          helperText={!foundBy ? "Found By is a required field" : ""}
        />
        <TextField
          id="found-pet-reack-no"
          label={"Rack Number"}
          required
          variant="outlined"
          error={!rackNumber}
          onChange={handleRackNumber}
          value={rackNumber}
          helperText={!rackNumber ? "Rack Number is a required field" : ""}
        />
      </div>
      <div>
        <TextField
          id="found-pet-age"
          label="Age (In Years)"
          onChange={handleAge}
          value={possibleAge}
          type="number"
          variant="outlined"
        />
        <TextField
          required
          error={!description}
          onChange={handleDescription}
          value={description}
          helperText={!description ? "Description is a required field" : ""}
          id="found-pet-description"
          label={"Description"}
          variant="outlined"
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
      </div>
      <Button color="primary" variant="outlined" type="submit">
        Submit
      </Button>
    </form>
  );
};
