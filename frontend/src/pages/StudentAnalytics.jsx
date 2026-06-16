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
  const [stats, setStats] =
    useState(null);

  const [results, setResults] =
    useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
        const studentId =
        localStorage.getItem(
            "studentId"
        );

        // Statistics API
        const statsRes = await API.get(
        `/results/stats/${studentId}`
        );

        // Results API
        const resultRes = await API.get(
        `/results/student/${studentId}`
        );

        setStats(statsRes.data);

        setResults(resultRes.data);
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
      value:
        Number(
          stats.present_days
        ),
    },
    {
      name: "Absent",
      value:
        Number(
          stats.absent_days
        ),
    },
  ];

  return (
    <StudentLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">
          Analytics
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Attendance Analysis
          </h2>

          <PieChart
            width={400}
            height={300}
          >
            <Pie
              data={
                attendanceData
              }
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              <Cell />
              <Cell />
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentAnalytics;