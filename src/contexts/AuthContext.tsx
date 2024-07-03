import { createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContextType } from "../Types/Authentication-types";
import toast from "react-hot-toast";

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );
    if (user) {
      Cookies.set("token", user.email, { expires: 7 });
      toast.success("Login successful.");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password.");
    }
  };

  const register = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find(
      (user: { email: string; password: string }) => user.email === email
    );

    if (userExists) {
      toast.error("User already registered.");
    }
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/");
    toast.success("Registration successful.");
  };

  const logout = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
