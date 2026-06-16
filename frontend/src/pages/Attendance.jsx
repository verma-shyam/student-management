import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AttendanceTable from "../components/AttendanceTable";
import API from "../api/axios";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    student_id: "",
    date: "",
    status: "Present",
  });

  // Fetch Attendance
  const fetchAttendance = async () => {
    try {
      const res = await API.get("/attendance");
      setAttendance(res.data);
    } catch (error) {
      console.error("Attendance Error:", error);
    }
  };

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Students Error:", error);
    }
  };

  // Add / Update Attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(
          `/attendance/${editingId}`,
          formData
        );

        alert("Attendance Updated");
      } else {
        await API.post(
          "/attendance",
          formData
        );

        alert("Attendance Added");
      }

      fetchAttendance();

      setEditingId(null);

      setFormData({
        student_id: "",
        date: "",
        status: "Present",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Edit Attendance
  const handleEdit = (record) => {
    setEditingId(record.id);

    setFormData({
      student_id: record.student_id,
      date: record.date.split("T")[0],
      status: record.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Attendance
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/attendance/${id}`
      );

      fetchAttendance();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">
          Attendance Management
        </h1>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Total Records</h2>

            <p className="text-3xl font-bold">
              {attendance.length}
            </p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Present</h2>

            <p className="text-3xl font-bold">
              {
                attendance.filter(
                  (item) =>
                    item.status ===
                    "Present"
                ).length
              }
            </p>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Absent</h2>

            <p className="text-3xl font-bold">
              {
                attendance.filter(
                  (item) =>
                    item.status ===
                    "Absent"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Attendance Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingId
              ? "Update Attendance"
              : "Mark Attendance"}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Student */}
            <select
              className="border p-3 rounded-lg"
              value={formData.student_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  student_id:
                    e.target.value,
                })
              }
              required
            >
              <option value="">
                Select Student
              </option>

              {students.map(
                (student) => (
                  <option
                    key={student.id}
                    value={student.id}
                  >
                    {student.name}
                  </option>
                )
              )}
            </select>

            {/* Date */}
            <input
              type="date"
              className="border p-3 rounded-lg"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date:
                    e.target.value,
                })
              }
              required
            />

            {/* Status */}
            <select
              className="border p-3 rounded-lg"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status:
                    e.target.value,
                })
              }
            >
              <option value="Present">
                Present
              </option>

              <option value="Absent">
                Absent
              </option>
            </select>
          </div>

          <button
            type="submit"
            className={`mt-4 text-white px-5 py-2 rounded-lg ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {editingId
              ? "Update Attendance"
              : "Save Attendance"}
          </button>
        </form>

        {/* Attendance Table */}
        <AttendanceTable
          attendance={attendance}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}

export default Attendance;