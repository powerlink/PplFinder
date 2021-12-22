import React, {useState} from "react";
import Text from "components/Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import * as S from "../../components/UserList/style";
import * as H from "../../pages/Home/style";

const Favorites = () => {
  const localS = localStorage.getItem("Favorites");
  const parseLocalS = localS ? JSON.parse(localS) : [];
  const [favorites, setFavorites] = useState(parseLocalS);

  const handleOnClickFavorite = (index) => {
    let newFavorites = []
     favorites.forEach(item => {
         if(favorites[index] != item)
           newFavorites.push(item);
     })


    setFavorites(newFavorites)
    localStorage.setItem("Favorites", JSON.stringify(newFavorites))
  }

  return (
    <H.Content>
          <H.Header>
            <Text size="64px" bold>
              PplFinder - Favorites
            </Text>
          </H.Header>
      <S.UserList>
      <S.List>
        {favorites
        .map((user, index) => {
          return (
            <S.User
              key={index}
              onClick={() => handleOnClickFavorite(index)}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={true}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
      </S.List>
    </S.UserList>
   </H.Content>
  );
};

export default Favorites;