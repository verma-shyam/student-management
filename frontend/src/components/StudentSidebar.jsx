import { Link } from "react-router-dom";

function StudentSidebar() {
  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">
        Student Portal
      </h2>

      <nav className="flex flex-col gap-4">
        <Link to="/student-dashboard">
          Dashboard
        </Link>

        <Link to="/my-attendance">
          My Attendance
        </Link>

        <Link to="/my-results">
          My Results
        </Link>

        <Link to="/my-profile">
          My Profile
        </Link>

        <Link to="/student-change-password">
          Change Password
        </Link>

        <Link to="/edit-profile">
            Edit Profile
        </Link>
        <Link to="/analytics">
            Analytics
        </Link>

        <Link to="/student-report">
            Student Report
        </Link>
      </nav>
    </div>
  );
}

export default StudentSidebar;