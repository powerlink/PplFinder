import React, { useState, useRef, useCallback } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { useFavoritePicker, usePeopleFetch } from "hooks";
import * as S from "./style";
import { NATIONALITIES as countries } from "constant";

const Home = () => {
  // Added user checked countries to component's state and passed it to the usePeopleHook.
  const [userCountries, setUserCountries] = useState([]);
  const [page, setPage] = useState(1);
  const { users, isLoading } = usePeopleFetch(userCountries, page);
  const { addOrRemoveFavorite, isUserFavorite } = useFavoritePicker();

  const observer = useRef();
  const lastUserElRef = useCallback(
    (userElRef) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([lastUserEl]) => {
        if (lastUserEl.isIntersecting) setPage((pageNum) => pageNum + 1);
      });

      if (userElRef) observer.current.observe(userElRef);
    },
    [isLoading]
  );

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
          infiniteScroll={true}
          lastUserRef={lastUserElRef}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
