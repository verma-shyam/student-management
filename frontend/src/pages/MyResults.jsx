import { useEffect, useState } from "react";
import API from "../api/axios";
import StudentLayout from "../layouts/StudentLayout";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function MyResults() {
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const studentId =
        localStorage.getItem(
          "studentId"
        );

      const res = await API.get(
        `/results/student/${studentId}`
      );

      setResults(res.data);
    } catch (error) {
      console.error(
        "Result Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Student Result Report",
      14,
      20
    );

    autoTable(doc, {
      startY: 30,

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
      "student-results.pdf"
    );
  };

  return (
    <StudentLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">
            My Results
          </h1>

          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Download PDF
          </button>
        </div>

        {loading ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            Loading Results...
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-4 text-center">
                    Course
                  </th>

                  <th className="p-4 text-center">
                    Marks
                  </th>

                  <th className="p-4 text-center">
                    Grade
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.length > 0 ? (
                  results.map(
                    (item) => (
                      <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 text-center"
                      >
                        <td className="p-4">
                          {item.course_name}
                        </td>

                        <td className="p-4 font-semibold">
                          {item.marks}
                        </td>

                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {item.grade}
                          </span>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="p-6 text-center"
                    >
                      No Results Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}

export default MyResults;