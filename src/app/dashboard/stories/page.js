"use client";
import React, { useState } from "react";

export default function ChildrenPage() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    ebookLink: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formData.name);
    formData.append("bio", formData.bio);
    formData.append("ebookLink", formData.ebookLink);
    formData.append("image", formData.file); // Set the file for upload

    try {
      const response = await fetch("/api/children", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newChild = await response.json();
        // handle successful submission, e.g., update state or show message
      } else {
        console.error("Failed to create child");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
        Add Children's Information
      </h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Child's Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter child's name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Child's Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            placeholder="Enter child's bio"
            value={formData.bio}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="ebookLink"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Ebook Link
          </label>
          <input
            type="url"
            name="ebookLink"
            id="ebookLink"
            placeholder="Enter ebook link"
            value={formData.ebookLink}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="file"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Upload Image
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleChange}
            accept="image/*"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full p-3 bg-[#ffbb02] text-white font-semibold rounded-md hover:bg-[#e6a600] focus:outline-none focus:ring-2 focus:ring-[#ffbb02]"
          >
            Add Child
          </button>
        </div>
      </form>
    </div>
  );
}
