function AttendanceTable({
  attendance = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-center">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-3">Student</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {attendance.length > 0 ? (
            attendance.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  {item.name}
                </td>

                <td className="p-3">
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <span
                    className={
                      item.status === "Present"
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                    }
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      onClick={() =>
                        onEdit(item)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() =>
                        onDelete(item.id)
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
                className="text-center p-6 text-gray-500"
              >
                No Attendance Records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;