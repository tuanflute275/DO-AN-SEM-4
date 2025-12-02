import { useSelector } from "react-redux";
import { selectUserData } from "./redux/reducers/user";
import { Route, Routes } from "react-router-dom";
import Error404 from "./components/pages/Error404";
import { clientRoutes, unloginRoutes } from "./routes/AppRoutes";

const App = () => {
  const userData = useSelector(selectUserData);
  console.log("~ App.js userData:", userData);
  return (
    <Routes>
      {
        !userData.user.id && unloginRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))
      }
      {
        userData.user.id && clientRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))
      }
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default App;