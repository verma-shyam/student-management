import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    results: 0,
    attendance: 0,
  });
  const [students, setStudents] = useState([]);
  const [reviewStudent, setReviewStudent] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    navigate("/");
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewSave = async (e) => {
    e.preventDefault();

    try {
      await API.post("/reviews", {
        student_id: reviewStudent,
        feedback,
      });

      setReviewStudent("");
      setFeedback("");
      alert("Feedback submitted successfully");
    } catch (error) {
      console.error(error);
      alert("Could not submit feedback");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchStats();
    fetchStudents();
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-100 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome to Student Management System
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">
              Attendance
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.attendance}%
            </p>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">
              Total Students
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.students}
            </p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">
              Total Courses
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.courses}
            </p>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">
              Total Results
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.results}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Provide Feedback</h3>
          <form onSubmit={handleReviewSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Student
              </label>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                value={reviewStudent}
                onChange={(e) => setReviewStudent(e.target.value)}
                required
              >
                <option value="">Choose a student</option>
                {students.map((studentItem) => (
                  <option key={studentItem.id} value={studentItem.id}>
                    {studentItem.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Feedback
              </label>
              <textarea
                className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">
            Recent Activities
          </h3>

          <ul className="space-y-4">
            <li className="border-b pb-2">
              ✅ New student registered
            </li>

            <li className="border-b pb-2">
              📚 Course added successfully
            </li>

            <li className="border-b pb-2">
              📝 Attendance updated
            </li>

            <li>
              🏆 Results published
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;