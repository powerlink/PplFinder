import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";
import { useFavoritePicker } from "hooks";

const Favorites = () => {
  const { addOrRemoveFavorite, isUserFavorite, favorites } = useFavoritePicker();

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            My Fav Ppl
          </Text>
        </S.Header>
        <UserList
          users={favorites}
          isLoading={false}
          addOrRemoveFavorite={addOrRemoveFavorite}
          isUserFavorite={isUserFavorite}
        />
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
