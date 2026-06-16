import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import CourseTable from "../components/CourseTable";
import API from "../api/axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    course_name: "",
    course_code: "",
    credits: "",
  });

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");

      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (editingId) {
        const res = await API.put(
            `/courses/${editingId}`,
            formData
        );

        setCourses(
            courses.map((course) =>
            course.id === editingId
                ? res.data
                : course
            )
        );

        setEditingId(null);

        alert("Course Updated");
        } else {
        const res = await API.post(
            "/courses",
            formData
        );

        setCourses([
            ...courses,
            res.data,
        ]);

        alert("Course Added");
        }

        setFormData({
        course_name: "",
        course_code: "",
        credits: "",
        });
    } catch (error) {
        console.error(error);
    }
    };

    const handleEdit = (course) => {
        setEditingId(course.id);

        setFormData({
            course_name: course.course_name,
            course_code: course.course_code,
            credits: course.credits,
        });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this course?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/courses/${id}`);

            setCourses(
            courses.filter(
                (course) => course.id !== id
            )
            );
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <DashboardLayout>
      <div className="p-8">

        <h1 className="text-4xl font-bold mb-6">
          Courses Management
        </h1>

        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-lg mb-6"
            >
            <h2 className="text-xl font-semibold mb-4">
                {editingId
                ? "Update Course"
                : "Add Course"}
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
                <input
                type="text"
                placeholder="Course Name"
                className="border p-3 rounded-lg"
                value={formData.course_name}
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    course_name: e.target.value,
                    })
                }
                />

                <input
                type="text"
                placeholder="Course Code"
                className="border p-3 rounded-lg"
                value={formData.course_code}
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    course_code: e.target.value,
                    })
                }
                />

                <input
                type="number"
                placeholder="Credits"
                className="border p-3 rounded-lg"
                value={formData.credits}
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    credits: e.target.value,
                    })
                }
                />
            </div>

            <button
                type="submit"
                className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
            >
                {editingId
                ? "Update Course"
                : "Save Course"}
            </button>
        </form>

        <CourseTable
          courses={courses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </div>
    </DashboardLayout>
  );
}

export default Courses;