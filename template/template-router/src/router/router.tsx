import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const NotFoundPage = lazy(() => import("../screens/404-not-found"));
@addPage

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Suspense>
        <NotFoundPage />
      </Suspense>
    ),
  },
  @addRouter
]);
