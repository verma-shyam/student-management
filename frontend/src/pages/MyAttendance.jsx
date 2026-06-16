import { useEffect, useState } from "react";
import API from "../api/axios";
import StudentLayout from "../layouts/StudentLayout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function MyAttendance() {
  const [attendance, setAttendance] =
    useState([]);

  useEffect(() => {
    const fetchAttendance =
      async () => {
        try {
          const studentId =
            localStorage.getItem(
              "studentId"
            );

          const res =
            await API.get(
              `/attendance/student/${studentId}`
            );

          setAttendance(
            res.data
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchAttendance();
}, []);

const downloadAttendancePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
        "Student Attendance Report",
        14,
        20
    );

    autoTable(doc, {
        startY: 30,

        head: [["Date", "Status"]],

        body: attendance.map(
        (item) => [
            new Date(
            item.date
            ).toLocaleDateString(),
            item.status,
        ]
        ),
    });

    doc.save(
        "attendance-report.pdf"
    );
};

  return (
    <StudentLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">
                My Attendance
            </h1>

            <button
                onClick={downloadAttendancePDF}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
                Download PDF
            </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-3 text-center">
                  Date
                </th>

                <th className="p-3 text-center">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {attendance.length > 0 ? (
                attendance.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-b text-center"
                    >
                      <td className="p-3">
                        {new Date(
                          item.date
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        <span
                          className={
                            item.status ===
                            "Present"
                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                              : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="p-6 text-center"
                  >
                    No Attendance Records
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
}

export default MyAttendance;