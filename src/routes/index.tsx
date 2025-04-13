import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import History from "../pages/History";
export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/history",
      element: <History />,
    },
  ]);
}
