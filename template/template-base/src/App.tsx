import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routers";
import "./locales";
import "antd-msb/dist/antd-msb.css";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
