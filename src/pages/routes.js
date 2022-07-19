import * as pages from "./index";
import { PAGES } from "constant";

const routes = [
  {
    path: "/",
    component: pages.Home,
    label: PAGES.home,
  },
  {
    path: "/favorites",
    component: pages.Favorites,
    label: PAGES.favorites,
  },
];

export default routes;
