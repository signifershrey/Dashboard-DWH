"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function StoriesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Loading state while checking session
  const [children, setChildren] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    ebookLink: "",
    file: null,
  });

  // Redirect non-admin users to the login page
  useEffect(() => {
    if (status === "loading") return; // Wait for session loading
    if (!session || session.user.role !== "admin") {
      router.push("/login"); // Redirect to login if not admin
    }
  }, [session, status, router]);

  // Fetch existing children information from the API
  useEffect(() => {
    if (status === "loading") return; // Don't fetch data if session is still loading
    const fetchChildren = async () => {
      try {
        const response = await fetch("/api/children");
        if (response.ok) {
          const data = await response.json();
          setChildren(data);
        } else {
          console.error("Failed to fetch children data");
        }
      } catch (error) {
        console.error("Error fetching children data:", error);
      }
    };

    fetchChildren();
  }, [status]); // Fetch children data only after the session is loaded

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("ebookLink", formData.ebookLink);
    formDataToSend.append("file", formData.file); // Attach uploaded file

    try {
      const response = await fetch("/api/children", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const newChild = await response.json();
        setChildren((prev) => [...prev, newChild]); // Update state with new child
        setFormData({ name: "", bio: "", ebookLink: "", file: null }); // Reset form fields
      } else {
        console.error("Failed to create child");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Loading state while checking session
  if (status === "loading") {
    return <p className="text-center text-lg text-yellow-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-[#ffbb02] mb-6">
          Stories Page
        </h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          This page is accessible only to admins.
        </p>

        {/* Children Information Section */}
        <h2 className="text-2xl font-bold text-center text-[#ffbb02] mb-4">
          Children Information
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Child's Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
          <textarea
            name="bio"
            placeholder="Child's Bio"
            value={formData.bio}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
          <input
            type="url"
            name="ebookLink"
            placeholder="Ebook Link"
            value={formData.ebookLink}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
          <input
            type="file"
            name="file"
            onChange={handleChange}
            accept="image/*"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full p-3 bg-[#ffbb02] text-white font-semibold rounded-md hover:bg-[#e6a600] focus:outline-none focus:ring-2 focus:ring-[#e6a600] focus:ring-opacity-50"
          >
            Add Child
          </button>
        </form>

        {/* Display list of children */}
        <ul className="mt-6 space-y-4">
          {children.map((child) => (
            <li
              key={child.id}
              className="p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#ffbb02]">
                {child.name}
              </h3>
              <p className="text-gray-700">{child.bio}</p>
              <a
                href={child.ebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffbb02] underline mt-2 block"
              >
                View eBook
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
