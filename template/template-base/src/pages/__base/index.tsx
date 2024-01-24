import { useRoutes } from "react-router-dom";
import __BaseListPage from "./container/list";
import __BaseDetailPage from "./container/detail";
import "./__base.styless.less";
const BasePage = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <__BaseListPage />,
    },
    {
      path: "/:mode/:id",
      element: <__BaseDetailPage />,
    },
  ]);
  return element;
};

export default BasePage;
