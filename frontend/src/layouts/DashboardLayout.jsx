import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    alert("Logged Out Successfully");

    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-slate-100 min-h-screen">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;