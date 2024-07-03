import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import Dashboard from "./modules/DashBoard/Dashboard";
import Register from "./modules/Authentication/Registration";
import Login from "./modules/Authentication/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
