import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (page) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page]);


  async function fetchUsers() {
    //setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${page}`);
    setIsLoading(true);
    setUsers([...users,...response.data.results] );
    setIsLoading(false);
  }

  return { users, isLoading };
};
