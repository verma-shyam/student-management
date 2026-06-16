import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import MyAttendance from "./pages/MyAttendance";
import MyAttendance from "./pages/MyAttendance";
import MyResults from "./pages/MyResults";
import MyProfile from "./pages/MyProfile";
import StudentAnalytics from "./pages/StudentAnalytics";
import EditProfile from "./pages/EditProfile";
import { Navigate } from "react-router-dom";
import StudentReport from "./pages/StudentReport";

function ProtectedStudentRoute({
  children,
}) {
  const token =
    localStorage.getItem(
      "studentToken"
    );

  if (!token) {
    return (
      <Navigate to="/student-login" />
    );
  }

  return children;
}

export default ProtectedStudentRoute;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses"
        element={<Courses />}
      />
      <Route
        path="/attendance"
        element={<Attendance />}
      />
      <Route
        path="/results"
        element={<Results />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/change-password"
        element={<ChangePassword />}
      />
      <Route 
        path="/student-login"
        element={<StudentLogin />}
      />
      <Route
        path="/student-dashboard"
        element={
          <ProtectedStudentRoute>
            <StudentDashboard />
          </ProtectedStudentRoute>
        }
      />
      <Route
        path="/my-attendance"
        element={<MyAttendance />}
      />
      <Route
        path="/my-attendance"
        element={<MyAttendance />}
      />
      <Route
        path="/my-results"
        element={<MyResults />}
      />
      <Route
        path="/my-profile"
        element={<MyProfile />}
      />
      <Route
        path="/student-change-password"
        element={<StudentChangePassword />}
      />
      <Route
        path="/analytics"
        element={<StudentAnalytics />}
      />
      <Route
        path="/edit-profile"
        element={<EditProfile />}
      />
      <Route
        path="/student-report"
        element={<StudentReport />}
      />
      
    </Routes>
  );
}

export default App;