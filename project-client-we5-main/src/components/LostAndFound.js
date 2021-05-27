import React from "react";
import { FoundPets, LostPets } from "./lost-found-components";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const LostAndFound = () => {
  const [value, setValue] = React.useState("lost-pets");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="Pets"
          name="pets"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="lost-pets"
            control={<Radio />}
            label="lost-pets"
          />
          <FormControlLabel
            value="found-pets"
            control={<Radio />}
            label="found-pets"
          />
        </RadioGroup>
      </FormControl>
      {value === "lost-pets" ? <LostPets /> : <FoundPets />}
    </>
  );
};

export default LostAndFound;
