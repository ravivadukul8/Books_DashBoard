import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "./Components/HeaderBar/Header";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  console.log(auth);

  return (
    <div className="">
      <Header />
    </div>
  );
};

export default Dashboard;
