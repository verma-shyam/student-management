import { useState } from "react";
import API from "../api/axios";
import StudentLayout from "../layouts/StudentLayout";

function StudentChangePassword() {
  const [formData, setFormData] =
    useState({
      email: "",
      oldPassword: "",
      newPassword: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        "/student-auth/change-password",
        formData
      );

      alert(
        "Password Updated Successfully"
      );

      setFormData({
        email: "",
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Update Failed"
      );
    }
  };

  return (
    <StudentLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg max-w-lg"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg mb-4"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Old Password"
            className="w-full border p-3 rounded-lg mb-4"
            value={
              formData.oldPassword
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                oldPassword:
                  e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded-lg mb-4"
            value={
              formData.newPassword
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                newPassword:
                  e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Change Password
          </button>
        </form>
      </div>
    </StudentLayout>
  );
}

export default StudentChangePassword;