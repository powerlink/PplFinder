import CheckBox from "components/CheckBox";

const CountriesList = ({ handle }) => {
  /**
   *
   * countries
   * task 1, bonus - add another country (Netherlands)
   * If you need to add another country you just need to add an object to array
   *
   */
  const countries = [
    { code: "BR", name: "Brazil" },
    { code: "AU", name: "Australia" },
    { code: "CA", name: "Canada" },
    { code: "DE", name: "Germany" },
    { code: "NL", name: "Netherlands" },
  ];

  return countries.map((country) => (
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
