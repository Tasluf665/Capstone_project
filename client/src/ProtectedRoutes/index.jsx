import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = secureLocalStorage.getItem("session") !== null;
    return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;