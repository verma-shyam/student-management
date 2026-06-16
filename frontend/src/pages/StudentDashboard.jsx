import { useEffect, useState } from "react";
import API from "../api/axios";
import StudentLayout from "../layouts/StudentLayout";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [stats, setStats] = useState({
    average_marks: 0,
    highest_marks: 0,
    lowest_marks: 0,
    attendance_percentage: 0,
    present_days: 0,
    absent_days: 0,
  });
  const [feedbackItems, setFeedbackItems] = useState([]);

  const profileImageUrl = student?.profile_image
    ? `http://localhost:5000/uploads/${student.profile_image}`
    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23e2e8f0'/%3E%3Ccircle cx='75' cy='55' r='30' fill='%239ca3af'/%3E%3Crect x='30' y='95' width='90' height='35' rx='10' fill='%239ca3af'/%3E%3C/svg%3E";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId =
          localStorage.getItem("studentId");

        const [studentRes, statsRes, reviewsRes] = await Promise.all([
          API.get(`/students/${studentId}`),
          API.get(`/results/stats/${studentId}`),
          API.get(`/reviews/student/${studentId}`),
        ]);

        setStudent(studentRes.data);
        setStats(statsRes.data);
        setFeedbackItems(
          reviewsRes.data.filter(
            (review) => review.feedback && review.feedback.trim()
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <StudentLayout>
      <div className="p-8 space-y-8">
        <h1 className="text-4xl font-bold mb-6">Student Dashboard</h1>

        {student && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 flex flex-col md:flex-row items-center gap-6">
            <img
              src={profileImageUrl}
              alt="Student Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
            />

            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome, {student.name}</h2>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
              <p>
                <strong>Phone:</strong> {student.phone}
              </p>
              <p>
                <strong>Department:</strong> {student.department}
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Attendance</h2>
            <p className="text-3xl font-bold">{stats.attendance_percentage}%</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Average Marks</h2>
            <p className="text-3xl font-bold">{stats.average_marks}</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Highest Marks</h2>
            <p className="text-3xl font-bold">{stats.highest_marks}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Lowest Marks</h2>
            <p className="text-3xl font-bold">{stats.lowest_marks}</p>
          </div>
          <div className="bg-teal-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Present Days</h2>
            <p className="text-3xl font-bold">{stats.present_days}</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Absent Days</h2>
            <p className="text-3xl font-bold">{stats.absent_days}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Feedback</h2>
            <span className="text-sm text-slate-500">Total {feedbackItems.length}</span>
          </div>

          {feedbackItems.length === 0 ? (
            <p className="text-slate-500">No feedback has been posted yet.</p>
          ) : (
            <div className="space-y-4">
              {feedbackItems.map((feedback) => (
                <div key={feedback.id} className="border border-slate-200 rounded-2xl p-4">
                  <p className="text-slate-800">{feedback.feedback}</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Posted on {new Date(feedback.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentDashboard;