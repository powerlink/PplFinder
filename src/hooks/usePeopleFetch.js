import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (userCountries) => {
  const RANDOMUSER_API = `https://randomuser.me/api/`;

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Added userCountries to useEffect deps to rerender with only desired users.
  useEffect(() => {
    fetchUsers(userCountries);
  }, [userCountries]);

  async function fetchUsers(userCountries) {
    setIsLoading(true);

    // Fetching only desired users using the nationality field.
    const fetchNewUsersURL = new URL(RANDOMUSER_API);
    fetchNewUsersURL.search = new URLSearchParams({
      results: 25,
      page: 1,
      nat: userCountries,
    });

    const response = await axios.get(fetchNewUsersURL.href);
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
