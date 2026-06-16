import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      alert(
        "New Password and Confirm Password do not match"
      );
      return;
    }

    try {
      const res = await API.post(
        "/auth/change-password",
        {
          email: formData.email,
          oldPassword:
            formData.oldPassword,
          newPassword:
            formData.newPassword,
        }
      );

      alert(res.data.message);

      setFormData({
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Password Change Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            className="w-full border p-3 rounded-lg"
            value={
              formData.oldPassword
            }
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full border p-3 rounded-lg"
            value={
              formData.newPassword
            }
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-lg"
            value={
              formData.confirmPassword
            }
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Change Password
          </button>
        </form>

        <p className="text-center mt-4">
          Back to{" "}
          <Link
            to="/"
            className="text-blue-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ChangePassword;