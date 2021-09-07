// import React from "react";
import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const [filterCountry, setFilterCountry] = useState({
    BR: false,
    AU: false,
    CA: false,
    DE: false,
    GB: false,
  });

  const { users, isLoading } = usePeopleFetch(filterCountry);

  function updateFilterCountry(value, isChecked) {
    setFilterCountry({ ...filterCountry, [value]: !isChecked });
    console.log("Home.js->After Pressed ", value, " ", filterCountry[value]);
  }

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
          updateFilterCountry={updateFilterCountry}
          filterCountry={filterCountry}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
