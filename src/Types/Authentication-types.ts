export interface AuthContextType {
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}
