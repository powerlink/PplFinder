import React, {  useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import InfiniteScroll from "react-infinite-scroll-component";


const UserList = ({ users, isLoading, onChange, onScroll}) => {

  const [hoveredUserId, setHoveredUserId] = useState();
  const [checked, setChecked] = useState([]);
  const [usersFilter, setFilter] = useState(users)
  const [favoritesList, setFavoritesList] = useState( Object.values(JSON.parse(localStorage.getItem('favorites')) || []) )

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleFavorits = (e, user) => {
    let favorites = Object.values(favoritesList);
     if(favorites.some(favorit => favorit.login.username === user.login.username)){
      favorites.map( (favorit, index) => {
          if(favorit.login.username === user.login.username) {
            favorites.splice( index, 1)} }) ;
     }
    else{
      favorites.push(user);
    }
    localStorage.setItem("favorites",JSON.stringify({...favorites}))

    setFavoritesList(favorites);
    onChange && onChange();
   };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleCheck = (event, label) => {
  let updatedList = [...checked];
  if (event.target.checked) {
    updatedList.push(label);
   } else {
    updatedList.splice(checked.indexOf(label), 1);
  }

  setChecked(updatedList);

 if(updatedList && updatedList.length){
   const data = users
   .filter((user) => updatedList.includes(user.location.country))
   .map((filteredName) => {
     return filteredName;
  });
  setFilter(data);
}else{
  setFilter(users);
}

   }
   const handleScroll = () => {
    console.log("userList")
    onScroll && onScroll();   }

  return (
    <S.UserList  >
      <S.Filters >
        <CheckBox onChange={handleCheck} value="BR" label="Brazil" />
        <CheckBox onChange={handleCheck} value="AU" label="Australia" />
        <CheckBox onChange={handleCheck} value="CA" label="Canada" />
        <CheckBox onChange={handleCheck} value="DE" label="Germany"/>
        <CheckBox onChange={handleCheck} value="NO" label="Norway"/>
      </S.Filters>
{!users.length && !isLoading ? ( <p style={{
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
}}>
      <b>Favorites is empty</b>
    </p>):(
       <InfiniteScroll
       dataLength={users.length}
       next={handleScroll}
       hasMore={true}
       loader={<h4>...</h4>}
     >
      <S.List>
        { (checked.length ?usersFilter :users).map((user, index) => {
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId || favoritesList.some(favorit => favorit.login?.username === user?.login?.username)}>
                <IconButton onClick={(e) => {handleFavorits(e, user)}}>
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
      </InfiniteScroll>

      )}
    </S.UserList>
        );
};


export default UserList;
