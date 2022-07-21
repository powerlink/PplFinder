import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { useFavoritePicker, usePeopleFetch } from "hooks";
import * as S from "./style";
import { NATIONALITIES as countries } from "constant";

const Home = () => {
  // Added user checked countries to component's state and passed it to the usePeopleHook.
  const [userCountries, setUserCountries] = useState([]);
  const { users, isLoading } = usePeopleFetch(userCountries);
  const { addOrRemoveFavorite, isUserFavorite } = useFavoritePicker();

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={users}
          isLoading={isLoading}
          setUserCountries={setUserCountries}
          userCountries={userCountries}
          countries={countries}
          addOrRemoveFavorite={addOrRemoveFavorite}
          isUserFavorite={isUserFavorite}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
