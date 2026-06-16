import { useEffect, useState } from "react";
import API from "../api/axios";
import StudentLayout from "../layouts/StudentLayout";

function EditProfile() {
  const [formData, setFormData] =
    useState({
      email: "",
      phone: "",
    });

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const studentId =
        localStorage.getItem(
          "studentId"
        );

      const res = await API.get(
        `/students/${studentId}`
      );

      setFormData({
        email: res.data.email || "",
        phone: res.data.phone || "",
      });

      if (
        res.data.profile_image
      ) {
        setPreview(
          `http://localhost:5000/uploads/${res.data.profile_image}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (file) {
      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const studentId =
        localStorage.getItem(
          "studentId"
        );

      // Update Email & Phone
      await API.put(
        `/students/profile/${studentId}`,
        formData
      );

      // Upload Image
      if (image) {
        const imageData =
          new FormData();

        imageData.append(
          "image",
          image
        );

        await API.put(
          `/students/upload/${studentId}`,
          imageData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      alert(
        "Profile Updated Successfully"
      );

      fetchProfile();
    } catch (error) {
      console.error(error);

      alert(
        "Profile Update Failed"
      );
    }
  };

  return (
    <StudentLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-6">
          Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg max-w-xl"
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={
                preview ||
                "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
            />

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="mt-4"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full border p-3 rounded-lg"
              value={
                formData.email
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              type="text"
              className="w-full border p-3 rounded-lg"
              value={
                formData.phone
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </StudentLayout>
  );
}

export default EditProfile;