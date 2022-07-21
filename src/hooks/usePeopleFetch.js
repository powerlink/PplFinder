import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (userCountries, page) => {
  const RANDOMUSER_API = `https://randomuser.me/api/`;

  const [users, setUsers] = useState([]);
  const [storeUsers, setStoreUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Added userCountries to useEffect deps to rerender with only desired users.
  useEffect(() => {
    setStoreUsers(false);
    setIsLoading(true);
    setUsers([]);
    fetchUsers(userCountries, page);
  }, [userCountries]);

  useEffect(() => {
    setStoreUsers(true);
    fetchUsers(userCountries, page);
  }, [page]);

  async function fetchUsers(userCountries, page = 1) {
    setIsLoading(true);

    // Fetching only desired users using the nationality field.
    const fetchNewUsersURL = new URL(RANDOMUSER_API);
    fetchNewUsersURL.search = new URLSearchParams({
      results: 25,
      page: page,
      nat: userCountries,
    });

    // TODO: add cancel token
    const newUsers = (await axios.get(fetchNewUsersURL.href)).data.results;

    setIsLoading(false);

    setUsers((users) => {
      if (storeUsers) return [...users, ...newUsers];
      return newUsers;
    });
  }

  return { users, isLoading, fetchUsers };
};
