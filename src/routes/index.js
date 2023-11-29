import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

const routes = [
  {
    path: "/login",
    component: <Login/>,
    exact: true,
  },
  {
    path: "register",
    component: <Register/>,
    exact: true,
  },
  {
    path: "/",
    component: <Dashboard/>,
    exact: true,
  },
];

export default routes;
