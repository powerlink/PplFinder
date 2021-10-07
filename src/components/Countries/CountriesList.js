import CheckBox from "components/CheckBox";
import * as C from "constant";

const CountriesList = ({ handle }) => {
  return C.COUNTRIES.map((country) => (
    <CheckBox
      value={country.code}
      label={country.name}
      onChange={(countryCode) => {
        handle(countryCode);
      }}
    />
  ));
};

export default CountriesList;
