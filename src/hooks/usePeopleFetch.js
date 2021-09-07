import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (filterCountry) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("usePeopleFetch.js-> ", filterCountry);

  let natFilters = "";
  for (const [key, value] of Object.entries(filterCountry)) {
    if (value === true)
    {
      natFilters = natFilters + key + ",";
    }
  }

  if (natFilters)
  {
    natFilters = "&nat=" + natFilters;
    natFilters = natFilters.slice(0, -1);
  }

  console.log("natFilters: ", natFilters);

  useEffect(() => {
    fetchUsers();
  }, [natFilters]);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1${natFilters}`);
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
