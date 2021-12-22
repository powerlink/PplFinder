import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
      setIsLoading(true);
      const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
      setIsLoading(false);
      let newUsersList = [];

      users.forEach(item => {
          newUsersList.push(item);
      })

    response.data.results.forEach(item => {
      newUsersList.push(item);
      })

     setUsers(newUsersList);
  }

  return { users, isLoading, fetchUsers };
};
async function buildList(items, token){
  try {
      const list = []
      let config = ''

      for (item of items.items) {
          config = {
              method: 'get',
              url: 'https://randomuser.me/api/?results=25&page=1' + item.id,
              headers: {
                  'Authorization': 'Bearer ' + token,
                  'Accept': 'application/json'
              }
          }

          const buildArray = (await axios(config)).data
          list.push(JSON.parse(buildArray))
      }

      return list

  } catch (err) {
      throw Error ('buildList error: ', err.message)
  }
  const filteredCountries = countries.filter(
    country =>
      country.name.toLowerCase().includes(searchedCountry.toLowerCase()) &&
      country.region.toLowerCase().includes(region.toLocaleLowerCase())
  );
  }