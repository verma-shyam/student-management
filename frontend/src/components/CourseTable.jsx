function CourseTable({
  courses = [],
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-center">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-3">Course Name</th>
            <th className="p-3">Course Code</th>
            <th className="p-3">Credits</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr
                key={course.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  {course.course_name}
                </td>

                <td className="p-3">
                  {course.course_code}
                </td>

                <td className="p-3">
                  {course.credits}
                </td>

                <td className="p-3">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        onEdit(course)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        onDelete(course.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center p-6"
              >
                No Courses Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;