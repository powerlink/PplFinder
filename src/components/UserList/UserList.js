import React, { useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useFavoritePicker } from "hooks";
import * as S from "./style";

const UserList = ({ users, isLoading, setUserCountries, userCountries }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const { addOrRemoveFavorite, isUserFavorite } = useFavoritePicker();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  // Country checkboxes' onChange event handler.
  const onCountryValueChange = (countryCode) => {
    // Based on if the value is present in the userCountries array,
    // add or remove changed checkbox's value.
    if (!userCountries.includes(countryCode))
      setUserCountries([...userCountries, countryCode]);
    else
      setUserCountries(
        userCountries.filter((countryCodeEl) => countryCodeEl != countryCode)
      );
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={onCountryValueChange} />
        <CheckBox value="AU" label="Australia" onChange={onCountryValueChange} />
        <CheckBox value="CA" label="Canada" onChange={onCountryValueChange} />
        <CheckBox value="DE" label="Germany" onChange={onCountryValueChange} />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
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
              <S.IconButtonWrapper
                isVisible={index === hoveredUserId || isUserFavorite(user)}
              >
                <IconButton
                  onClick={() => {
                    addOrRemoveFavorite(user);
                  }}
                >
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
