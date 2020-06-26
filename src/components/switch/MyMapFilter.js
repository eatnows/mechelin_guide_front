import React from "react";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function MyMapFilter() {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="true"
          control={<Switch color="primary" />}
          label="내맛집"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
}
