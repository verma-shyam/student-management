import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ResultTable from "../components/ResultTable";
import API from "../api/axios";

function Results() {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
    marks: "",
  });

  // Fetch Results
  const fetchResults = async () => {
    try {
      const res = await API.get("/results");
      setResults(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add / Update Result
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(
          `/results/${editingId}`,
          formData
        );

        alert("Result Updated");
      } else {
        await API.post(
          "/results",
          formData
        );

        alert("Result Added");
      }

      fetchResults();

      setEditingId(null);

      setFormData({
        student_id: "",
        course_id: "",
        marks: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Edit Result
  const handleEdit = (result) => {
    setEditingId(result.id);

    setFormData({
      student_id: result.student_id,
      course_id: result.course_id,
      marks: result.marks,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Result
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this result?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/results/${id}`);

      fetchResults();
    } catch (error) {
      console.error(error);
    }
  };

  // Search Filter
  const filteredResults = results.filter(
    (result) =>
      result.student_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      result.course_name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchResults();
    fetchStudents();
    fetchCourses();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">
          Results Management
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Total Results</h2>
            <p className="text-3xl font-bold">
              {results.length}
            </p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Students</h2>
            <p className="text-3xl font-bold">
              {students.length}
            </p>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
            <h2>Courses</h2>
            <p className="text-3xl font-bold">
              {courses.length}
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingId
              ? "Update Result"
              : "Add Result"}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <select
              className="border p-3 rounded-lg"
              value={formData.student_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  student_id: e.target.value,
                })
              }
              required
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.name}
                </option>
              ))}
            </select>

            <select
              className="border p-3 rounded-lg"
              value={formData.course_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  course_id: e.target.value,
                })
              }
              required
            >
              <option value="">
                Select Course
              </option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.course_name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Marks"
              className="border p-3 rounded-lg"
              value={formData.marks}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  marks: e.target.value,
                })
              }
              required
            />
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
              ? "Update Result"
              : "Save Result"}
          </button>
        </form>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Student or Course..."
            className="w-full border p-3 rounded-lg"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* Table */}
        <ResultTable
          results={filteredResults}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}

export default Results;