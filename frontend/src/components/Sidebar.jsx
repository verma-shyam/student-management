import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        🎓 SMS
      </h1>

      <ul className="space-y-4">
        <li>
          <Link
            to="/dashboard"
            className="block p-3 rounded hover:bg-slate-700"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/students"
            className="block p-3 rounded hover:bg-slate-700"
          >
            Students
          </Link>
        </li>

        <li>
          <Link
            to="/courses"
            className="block p-3 rounded hover:bg-slate-700"
          >
            Courses
          </Link>
        </li>

        <li>
          <Link
            to="/attendance"
            className="block p-3 rounded hover:bg-slate-700"
          >
            Attendance
          </Link>
        </li>

        <li>
          <Link
            to="/results"
            className="block p-3 rounded hover:bg-slate-700"
          >
            Results
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;