import React from "react";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CategoryFilter() {
  const [koreanChecked, setKoreanChecked] = React.useState(true);
  const [westernChecked, setWesternChecked] = React.useState(true);
  const [chineseChecked, setChineseChecked] = React.useState(true);
  const [japaneseChecked, setJapaneseChecked] = React.useState(true);

  const koreanHandleChange = (event) => {
    setKoreanChecked(event.target.checked);
  };

  const westernHandleChange = (event) => {
    setWesternChecked(event.target.checked);
  };
  const chineseHandleChange = (event) => {
    setChineseChecked(event.target.checked);
  };
  const japaneseHandleChange = (event) => {
    setJapaneseChecked(event.target.checked);
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={koreanChecked}
            onChange={koreanHandleChange}
            name="korean"
            color="primary"
          />
        }
        label="한식"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={westernChecked}
            onChange={westernHandleChange}
            name="western"
            color="primary"
          />
        }
        label="양식"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={chineseChecked}
            onChange={chineseHandleChange}
            name="chinese"
            color="primary"
          />
        }
        label="중식"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={japaneseChecked}
            onChange={japaneseHandleChange}
            name="japanese"
            color="primary"
          />
        }
        label="일식"
      />
    </FormGroup>
  );
}
