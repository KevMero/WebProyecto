import { Home, Users, AddUser } from "../pages";
import HistoryUser from "../pages/HistoryUser/HistoryUser";

export const routesUser = [
  {
    path: "/home",
    page: Home,
  },
  {
    path: "/users",
    page: Users,
  },
  {
    path: "/add-user",
    page: AddUser,
  },

  {
    path: "/detail-user/:id",
    page: HistoryUser,
  },
];
