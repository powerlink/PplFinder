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

    const fetchConfig = {
      params: { results: 25, page: page, nat: userCountries.join() },
    };
    const newUsers = (await axios.get(RANDOMUSER_API, fetchConfig)).data.results;

    setIsLoading(false);
    setUsers((users) => {
      if (storeUsers) return [...users, ...newUsers];
      return newUsers;
    });
  }

  return { users, isLoading, fetchUsers };
};
