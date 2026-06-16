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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId =
          localStorage.getItem("studentId");

        const studentRes = await API.get(
          `/students/${studentId}`
        );

        const statsRes = await API.get(
          `/results/stats/${studentId}`
        );

        setStudent(studentRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <StudentLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">
          Student Dashboard
        </h1>

        {student && (
          <>
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">
                Welcome, {student.name}
              </h2>

              <p>
                <strong>Email:</strong>{" "}
                {student.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {student.phone}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {student.department}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">

              <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
                <h2>Attendance</h2>
                <p className="text-3xl font-bold">
                  {stats.attendance_percentage}%
                </p>
              </div>

              <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
                <h2>Average Marks</h2>
                <p className="text-3xl font-bold">
                  {stats.average_marks}
                </p>
              </div>

              <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
                <h2>Highest Marks</h2>
                <p className="text-3xl font-bold">
                  {stats.highest_marks}
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
                <h2>Lowest Marks</h2>
                <p className="text-3xl font-bold">
                  {stats.lowest_marks}
                </p>
              </div>

              <div className="bg-teal-500 text-white p-6 rounded-xl shadow-lg">
                <h2>Present Days</h2>
                <p className="text-3xl font-bold">
                  {stats.present_days}
                </p>
              </div>

              <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
                <h2>Absent Days</h2>
                <p className="text-3xl font-bold">
                  {stats.absent_days}
                </p>
              </div>

            </div>
          </>
        )}
      </div>
    </StudentLayout>
  );
}

export default StudentDashboard;