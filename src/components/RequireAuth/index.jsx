import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/user/userSlice';

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const currentUser = useSelector((state) => selectCurrentUser(state));
    console.log("allowed roles:", allowedRoles);
    console.log("role of user:", currentUser?.role);
    console.log("current user object:", currentUser);

    return (
        allowedRoles === currentUser?.role
            ? <Outlet />
            : currentUser
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;