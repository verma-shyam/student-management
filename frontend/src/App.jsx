import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedStudentRoute from "./components/ProtectedStudentRoute";

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
import MyResults from "./pages/MyResults";
import MyProfile from "./pages/MyProfile";
import StudentAnalytics from "./pages/StudentAnalytics";
import EditProfile from "./pages/EditProfile";
import StudentReport from "./pages/StudentReport";
import StudentChangePassword from "./pages/StudentChangePassword";

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
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
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
        element={
          <ProtectedStudentRoute>
            <MyAttendance />
          </ProtectedStudentRoute>
        }
      />
      <Route
        path="/my-results"
        element={
          <ProtectedStudentRoute>
            <MyResults />
          </ProtectedStudentRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <ProtectedStudentRoute>
            <MyProfile />
          </ProtectedStudentRoute>
        }
      />
      <Route
        path="/student-change-password"
        element={
          <ProtectedStudentRoute>
            <StudentChangePassword />
          </ProtectedStudentRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedStudentRoute>
            <StudentAnalytics />
          </ProtectedStudentRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedStudentRoute>
            <EditProfile />
          </ProtectedStudentRoute>
        }
      />
      <Route
        path="/student-report"
        element={
          <ProtectedStudentRoute>
            <StudentReport />
          </ProtectedStudentRoute>
        }
      />
    </Routes>
  );
}

export default App;