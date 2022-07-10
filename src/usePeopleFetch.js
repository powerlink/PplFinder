import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (page) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://randomuser.me/api/?results=25&page=${page}`).then(
      response => {
        setUsers(users =>
          { return [...users,...response.data.results]});
      }
    );
    setIsLoading(false);
  }, [page]);

  return { users, isLoading };
};
