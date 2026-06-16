import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function StudentLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentId");

    navigate("/");
  };

  return (
    <div className="flex">
      <StudentSidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">
        <div className="bg-white shadow p-4 flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default StudentLayout;