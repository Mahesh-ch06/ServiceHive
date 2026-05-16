import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import DashboardLayout from "../components/layout/DashboardLayout";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default ProtectedRoute;
