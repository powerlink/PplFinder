import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import InfiniteScroll from 'react-infinite-scroll-component'

const Home = () => {
  const { users, isLoading, fetchUsers } = usePeopleFetch();

  return (
      <S.Home>
        <S.Content>
          <S.Header>
            <Text size="64px" bold>
              PplFinder
            </Text>
          </S.Header>
          <InfiniteScroll
            dataLength={users.length} //This is important field to render the next data
            next={fetchUsers}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
          <UserList users={users} isLoading={isLoading} />
        </InfiniteScroll>
        </S.Content>
      </S.Home>

  );
};

export default Home;