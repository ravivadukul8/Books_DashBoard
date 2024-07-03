import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="w-full flex flex-row justify-between items-center p-5 bg-gray-600">
      <h1 className="text-2xl text-slate-50">Header</h1>
      <h6
        className="text-slate-50 cursor-pointer"
        onClick={() => {
          auth?.logout();
        }}
      >
        Logout
      </h6>
    </div>
  );
};

export default Header;
