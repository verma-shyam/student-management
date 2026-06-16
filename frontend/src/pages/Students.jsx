import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentTable from "../components/StudentTable";
import API from "../api/axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    password: "",
  });
  const [createdCredentials, setCreatedCredentials] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/students"
      );

      const data = await response.json();

      console.log("DATA:", data);

      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/students/${id}`);

      setStudents((prev) =>
        prev.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);

    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      department: student.department,
      password: "",
    });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await API.put(
          `/students/${editingId}`,
          formData
        );

        setStudents(
          students.map((student) =>
            student.id === editingId
              ? res.data
              : student
          )
        );

        setEditingId(null);

        alert("Student Updated");
      } else {
        const res = await API.post(
          "/students",
          formData
        );

        setStudents([
          ...students,
          res.data.student,
        ]);

        setCreatedCredentials(
          res.data.credentials
        );

        alert("Student Added");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Students Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all students in one place
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition">
            + Add Student
          </button>
        </div>

        <form
          onSubmit={handleAddStudent}
          className="bg-white p-6 rounded-2xl shadow-lg mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            Add New Student
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Phone"
              className="border p-3 rounded-lg"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Department"
              className="border p-3 rounded-lg"
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              required={!editingId}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Save Student
          </button>
        </form>

        {createdCredentials && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Newly Created Student Credentials
            </h3>
            <p>
              <strong>Student ID:</strong>{" "}
              {createdCredentials.student_id}
            </p>
            <p>
              <strong>Password:</strong>{" "}
              {createdCredentials.password}
            </p>
          </div>
        )}
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Student Records
            </h2>

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              Total: {students.length}
            </span>
          </div>

          {loading ? (
            <div className="text-center py-10">
              Loading Students...
            </div>
          ) : (
            <StudentTable
              students={filteredStudents}
              onDelete={deleteStudent}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Students;