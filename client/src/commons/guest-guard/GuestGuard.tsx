import { Navigate, Outlet } from "react-router-dom";
import { useUserThemeContext } from "../../contexts/UserAndTheme";

export default function GuestGuard() {
	const { user } = useUserThemeContext();
	return <>{user ? <Navigate to="/" /> : <Outlet />}</>;
}
