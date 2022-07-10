import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";
import { useState } from "react";

const Favorites = () => {
  const [favoritesList, setFavoritesList] = useState( Object.values(JSON.parse(localStorage.getItem('favorites')) || []) )

  const handleChange = () => {

    setFavoritesList(Object.values(JSON.parse(localStorage.getItem('favorites')) || []))
  }

return (
  <S.Home>
    <S.Content>
      <S.Header>
        <Text size="64px" bold>
          PplFinder
        </Text>
      </S.Header>
      <UserList users={favoritesList} onChange={handleChange}/>
    </S.Content>
  </S.Home>
);
};

export default Favorites;
