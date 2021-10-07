import { useState, useEffect } from "react";
import axios from "axios";

var selectedCountries = [];

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectedCountries = (country) => {
    addCountry(country);
    fetchUsers();
  };

  /**
   * The function checks if the selected country is in the array.
   *
   * If not adds it to array.
   * If yes removes it
   *
   * @param country gets the country code as a parameter
   */

  function addCountry(country) {
    const countryIndex = selectedCountries.indexOf(country);
    if (countryIndex >= 0) {
      selectedCountries.splice(countryIndex, 1);
    } else {
      selectedCountries.push(country);
    }
  }

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?results=25&page=${pageNumber}&nat=${selectedCountries}`
    );
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, handleSelectedCountries, fetchUsers };
};
