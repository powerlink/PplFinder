import { useEffect, useState } from "react";

export const useFavoritePicker = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) ?? []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addOrRemoveFavorite = (user) => {
    if (favorites.includes(user)) removeFromFavorites(user);
    else addToFavorites(user);
  };

  const removeFromFavorites = (userToRemove) => {
    setFavorites(favorites.filter((user) => user != userToRemove));
  };

  const addToFavorites = (userToAdd) => {
    setFavorites([...favorites, userToAdd]);
  };

  const isUserFavorite = (user) => {
    return favorites.includes(user);
  };

  return { addOrRemoveFavorite, isUserFavorite };
};
