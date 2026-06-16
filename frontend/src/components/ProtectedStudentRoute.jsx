import { Navigate } from "react-router-dom";

function ProtectedStudentRoute({
  children,
}) {
  const token =
    localStorage.getItem(
      "studentToken"
    );

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedStudentRoute;