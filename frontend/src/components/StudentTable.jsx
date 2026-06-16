function StudentTable({ students = [], onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-center">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Department</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students?.length > 0 ? (
            students.map((student) => (
              <tr
                key={student.id}
                className="border-b hover:bg-gray-50"
                >
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.phone}</td>
                <td className="p-3">{student.department}</td>

                <td className="p-3">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => onDelete(student.id)}
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
                No Students Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;