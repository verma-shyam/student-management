import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoint =
      role === "admin"
        ? "/auth/login"
        : "/student-auth/login";

    const payload = { email, password };

    try {
      const res = await API.post(endpoint, payload);

      if (role === "admin") {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        localStorage.setItem("studentToken", res.data.token);
        localStorage.setItem("studentId", res.data.student_id);
        navigate("/student-dashboard");
      }

      alert(`${role === "admin" ? "Admin" : "Student"} Login Successful`);
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          {role === "admin" ? "Admin Login" : "Student Login"}
        </h2>

        <div className="flex justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setEmail("");
            }}
            className={`px-4 py-2 rounded-lg border ${
              role === "admin"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => {
              setRole("student");
              setEmail("");
            }}
            className={`px-4 py-2 rounded-lg border ${
              role === "student"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            Student
          </button>
        </div>

        <input
          type="email"
          placeholder={
            role === "admin"
              ? "Admin Email"
              : "Student Email"
          }
          className="border p-3 w-full mb-4 rounded-lg"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4 rounded-lg"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg w-full transition"
        >
          Login
        </button>

        <p className="text-center mt-5">
          {role === "admin" ? (
            <>Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
            </>
          ) : (
            <>Use the student email and password saved by admin.</>
          )}
        </p>

        <p className="text-center mt-3">
          <Link
            to="/change-password"
            className="text-red-600 font-medium hover:underline"
          >
            Change Password
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;