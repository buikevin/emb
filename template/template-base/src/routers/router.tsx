/**
 * @author hieubt
 * @email [hieubt2@msb.com.vn]
 * @create date 18/01/2024
 * @modify date 18/01/2024
 * @desc [description]
 */
import { Outlet, createMemoryRouter, useNavigate } from "react-router-dom";
import { Button, Result } from "antd-msb";
import { Suspense, lazy } from "react";
const __BasePage = lazy(() => import("../pages/__base/index"));
const ErrorBoundary = () => {
  const navigate = useNavigate();
  return (
    <Result
      status={"500"}
      title="500"
      subTitle="Sorry, something went wrong"
      extra={
        <Button type="primary" onClick={() => navigate("./login")}></Button>
      }
    />
  );
};

export const router = createMemoryRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/__base",
        element: (
          <Suspense>
            <__BasePage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);
