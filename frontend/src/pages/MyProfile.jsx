import { useEffect, useState } from "react";
import API from "../api/axios";
import StudentLayout from "../layouts/StudentLayout";

function MyProfile() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const studentId = localStorage.getItem("studentId");
        const res = await API.get(`/students/${studentId}`);
        setStudent(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <StudentLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">My Profile</h1>

        {student && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {student.name}
              </p>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
              <p>
                <strong>Phone:</strong> {student.phone}
              </p>
              <p>
                <strong>Department:</strong> {student.department}
              </p>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}

export default MyProfile;
