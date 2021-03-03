
import { createContext, useContext } from "react";
export const AuthContext = createContext();

export default () => useContext(AuthContext);

