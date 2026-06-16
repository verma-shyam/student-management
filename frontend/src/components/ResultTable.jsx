function ResultTable({
  results = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-center">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Course</th>
            <th className="p-3">Marks</th>
            <th className="p-3">Grade</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {results.length > 0 ? (
            results.map((result) => (
              <tr
                key={result.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  {result.student_name}
                </td>

                <td className="p-3">
                  {result.course_name}
                </td>

                <td className="p-3">
                  {result.marks}
                </td>

                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {result.grade}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      onClick={() =>
                        onEdit(result)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() =>
                        onDelete(result.id)
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
                colSpan="5"
                className="text-center p-6 text-gray-500"
              >
                No Results Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;