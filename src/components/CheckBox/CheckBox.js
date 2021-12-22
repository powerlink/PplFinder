import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ isChecked, onChangeFromParent, label }) => {
  const handleChange = (e) => {
      if (e.target.checked) {
        onChangeFromParent && onChangeFromParent(label,"add");
      } else{
        onChangeFromParent && onChangeFromParent(label,"remove");
      }

  };
  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} color="primary" />}
        label={label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;