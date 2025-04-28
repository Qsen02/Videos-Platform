import { Navigate, Outlet } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";

export default function UserGuard() {
	const { user } = useUserThemeContext();
	return <>{!user ? <Navigate to="/login" /> : <Outlet />}</>;
}
