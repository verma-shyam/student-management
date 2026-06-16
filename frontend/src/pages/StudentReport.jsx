import { useEffect, useState } from "react";
import API from "../api/axios";
import StudentLayout from "../layouts/StudentLayout";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function StudentReport() {
  const [student, setStudent] =
    useState(null);

  const [results, setResults] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentId =
        localStorage.getItem(
          "studentId"
        );

      const studentRes =
        await API.get(
          `/students/${studentId}`
        );

      const resultRes =
        await API.get(
          `/results/student/${studentId}`
        );

      const statsRes =
        await API.get(
          `/results/stats/${studentId}`
        );

      setStudent(
        studentRes.data
      );

      setResults(
        resultRes.data
      );

      setStats(
        statsRes.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const downloadReport =
    () => {
      const doc =
        new jsPDF();

      // Title
      doc.setFontSize(20);

      doc.text(
        "Student Academic Report",
        14,
        20
      );

      // Student Information
      doc.setFontSize(14);

      doc.text(
        "Student Information",
        14,
        35
      );

      doc.setFontSize(11);

      doc.text(
        `Name: ${student?.name || ""}`,
        14,
        45
      );

      doc.text(
        `Email: ${student?.email || ""}`,
        14,
        52
      );

      doc.text(
        `Phone: ${student?.phone || ""}`,
        14,
        59
      );

      doc.text(
        `Department: ${
          student?.department || ""
        }`,
        14,
        66
      );

      // Attendance
      doc.setFontSize(14);

      doc.text(
        "Attendance Summary",
        14,
        82
      );

      doc.setFontSize(11);

      doc.text(
        `Present Days: ${stats?.present_days}`,
        14,
        92
      );

      doc.text(
        `Absent Days: ${stats?.absent_days}`,
        14,
        99
      );

      doc.text(
        `Attendance Percentage: ${stats?.attendance_percentage}%`,
        14,
        106
      );

      // Performance
      doc.setFontSize(14);

      doc.text(
        "Performance Summary",
        14,
        122
      );

      doc.setFontSize(11);

      doc.text(
        `Average Marks: ${stats?.average_marks}`,
        14,
        132
      );

      doc.text(
        `Highest Marks: ${stats?.highest_marks}`,
        14,
        139
      );

      doc.text(
        `Lowest Marks: ${stats?.lowest_marks}`,
        14,
        146
      );

      // Results Table
      autoTable(doc, {
        startY: 160,

        head: [
          [
            "Course",
            "Marks",
            "Grade",
          ],
        ],

        body: results.map(
          (item) => [
            item.course_name,
            item.marks,
            item.grade,
          ]
        ),
      });

      doc.save(
        "student-report.pdf"
      );
    };

  return (
    <StudentLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">
            Student Report
          </h1>

          <button
            onClick={
              downloadReport
            }
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
          >
            Download Report
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Academic Report
          </h2>

          {student && (
            <>
              <p>
                <strong>
                  Name:
                </strong>{" "}
                {student.name}
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {student.email}
              </p>

              <p>
                <strong>
                  Phone:
                </strong>{" "}
                {student.phone}
              </p>

              <p>
                <strong>
                  Department:
                </strong>{" "}
                {student.department}
              </p>
            </>
          )}

          {stats && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">
                Performance
              </h3>

              <p>
                Attendance:
                {" "}
                {
                  stats.attendance_percentage
                }
                %
              </p>

              <p>
                Average Marks:
                {" "}
                {
                  stats.average_marks
                }
              </p>

              <p>
                Highest Marks:
                {" "}
                {
                  stats.highest_marks
                }
              </p>

              <p>
                Lowest Marks:
                {" "}
                {
                  stats.lowest_marks
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentReport;