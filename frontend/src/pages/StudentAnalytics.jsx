import { useEffect, useState } from "react";
import API from "../api/axios";
import StudentLayout from "../layouts/StudentLayout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function StudentAnalytics() {
  const [stats, setStats] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const studentId =
        localStorage.getItem("studentId");

      if (!studentId) {
        throw new Error(
          "Student ID is missing"
        );
      }

      const statsRes = await API.get(
        `/results/stats/${studentId}`
      );
      const resultRes = await API.get(
        `/results/student/${studentId}`
      );

      setStats(statsRes.data);
      setResults(resultRes.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <StudentLayout>
        <div className="p-8">
          Loading...
        </div>
      </StudentLayout>
    );
  }

  const attendanceData = [
    {
      name: "Present",
      value: Number(stats.present_days || 0),
    },
    {
      name: "Absent",
      value: Number(stats.absent_days || 0),
    },
  ];

  const resultData = results.map((item) => ({
    subject: item.course_name || item.course || "Subject",
    marks: Number(item.marks || 0),
  }));

  return (
    <StudentLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">
          Analytics
        </h1>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Attendance Analysis
            </h2>

            <div className="w-full h-80">
              <PieChart width={400} height={300}>
                <Pie
                  data={attendanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {attendanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "#1d4ed8"
                          : "#ef4444"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Result Performance
            </h2>

            <div className="w-full h-80">
              <BarChart width={500} height={300} data={resultData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="marks" fill="#2563eb" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentAnalytics;