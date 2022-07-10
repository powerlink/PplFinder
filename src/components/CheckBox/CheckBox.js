import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ isChecked, onChange, label }) => {
  const handleChange = (event) => {
    onChange && onChange(event , label);
  };



  return (
    <S.CheckBox>
      <FormControlLabel
        control={<Checkbox checked={isChecked} color="primary" onClick={(e) => handleChange(e)}/>}
        label={label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;
