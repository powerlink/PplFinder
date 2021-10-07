import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import { useState } from "react";

const Home = () => {
  const { users, isLoading} = usePeopleFetch();

  const handleCountrySelection = (selectedCountry) => {
    console.log(selectedCountry);
  };

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
          countryHandle={handleCountrySelection}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
