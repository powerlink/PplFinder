import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [checkedBoxed, setCheckedBoxed] = useState([]);
  const localS = localStorage.getItem("Favorites");
  const parseLocalS = localS ? JSON.parse(localS) : [];
  const [favorites, setFavorites] = useState(parseLocalS);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleAddOrRemoveFilter = (value,addOrRemove) => {
    let newCheckBoxed = [];

    if(addOrRemove === "add") {
      checkedBoxed.forEach(item => {
        newCheckBoxed.push(item);
      })
      newCheckBoxed.push(value);
    } else {
      checkedBoxed.forEach(item => {
        if (value !== item) {
          newCheckBoxed.push(item);
        }
      })
    }
    setCheckedBoxed(newCheckBoxed);
  }

  const checkConditionToVisible = (index) => {
    return index === hoveredUserId || favorites.includes(users[index])
  }

  const handleOnClickFavorite = (index) => {
    let newFavorites = []
    if(favorites.includes(users[index])) {
      favorites.forEach(item => {
        if(users[index] != item){
          newFavorites.push(item)
        }
      })
    }
    else{
       favorites.forEach(item => {
          newFavorites.push(item);
       })
      newFavorites.push(users[index])

    }

    setFavorites(newFavorites)
    localStorage.setItem("Favorites", JSON.stringify(newFavorites))
  }

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChangeFromParent={handleAddOrRemoveFilter}/>
        <CheckBox value="AU" label="Australia" onChangeFromParent={handleAddOrRemoveFilter}/>
        <CheckBox value="CA" label="Canada" onChangeFromParent={handleAddOrRemoveFilter}/>
        <CheckBox value="DE" label="Germany" onChangeFromParent={handleAddOrRemoveFilter}/>
      </S.Filters>
      <S.List>
        {users
        .filter(user => {
          if(checkedBoxed.length === 0) {
            return true;
          }

          return checkedBoxed.includes(user.location.country)
        })
        .map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
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
              <S.IconButtonWrapper isVisible={checkConditionToVisible(index)}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;