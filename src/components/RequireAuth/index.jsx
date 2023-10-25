import { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/user/userSlice';
import Loading from '../../pages/LoadingPages/Loading';

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const currentUser = useSelector((state) => selectCurrentUser(state));
    const [isLoading, setIsLoading] = useState(true);
    console.log("allowed roles:", allowedRoles);
    console.log("role of user:", currentUser?.role);
    console.log("current user object:", currentUser);

    // There seems to be a race condition between when the user's authentication 
    // state is determined and when the RequireAuth component is rendered. 
    // The RequireAuth component is making a decision based on the user's 
    // role before that information is available. So we need a loading state.
    useEffect(() => {
      if (currentUser !== undefined) { // Check if the user data is available
        setIsLoading(false);
      }
    }, [currentUser]);
    
    if (isLoading) {
      return <Loading />; // Render a loading indicator while waiting for the user's role
    }
      

    return (
      allowedRoles === currentUser?.role
          ? <Outlet />
          : currentUser
              ? <Navigate to="/unauthorized" state={{ from: location }} replace />
              : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;