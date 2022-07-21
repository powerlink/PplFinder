import { useEffect, useState } from "react";

export const useFavoritePicker = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) ?? []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addOrRemoveFavorite = (user) => {
    if (isUserFavorite(user)) removeFromFavorites(user);
    else addToFavorites(user);
  };

  const removeFromFavorites = (userToRemove) => {
    setFavorites(favorites.filter((user) => !compareUsers(user, userToRemove)));
  };

  const addToFavorites = (userToAdd) => {
    setFavorites([...favorites, userToAdd]);
  };

  const isUserFavorite = (user) => {
    for (let i = 0; i < favorites.length; i++) {
      if (compareUsers(favorites[i], user)) return true;
    }
    return false;
  };

  const compareUsers = (userA, userB) => {
    return JSON.stringify(userA) === JSON.stringify(userB);
  };

  return { addOrRemoveFavorite, isUserFavorite, favorites };
};
