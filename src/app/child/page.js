"use client";
import { useState } from "react";

export default function RetrieveForm() {
  const [formId, setFormId] = useState("");
  const [formData, setFormData] = useState(null);
  const [imageError, setImageError] = useState(false); // To track image load errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch form data using the formId
    const res = await fetch(`/api/get-form?formId=${formId}`);
    const data = await res.json();

    if (res.ok) {
      setFormData(data);
      setImageError(false); // Reset the error state if new form data is fetched
    } else {
      alert(data.message || "Error retrieving form");
    }
  };

  const handleImageError = () => {
    setImageError(true); // Set error flag when image fails to load
  };

  return (
    <div>
      <h1>Retrieve Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Form ID"
          value={formId}
          onChange={(e) => setFormId(e.target.value)}
        />
        <button type="submit">Retrieve</button>
      </form>

      {formData && (
        <div>
          <h2>{formData.name}</h2>
          <p>{formData.bio}</p>
          <a
            href={formData.ebookLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ebook Link
          </a>
          imageUrl
          {/* Image with error handling */}
          {formData.imageUrl && !imageError ? (
            <img
              src={formData.imageUrl}
              alt="Form Image"
              onError={handleImageError} // Call handleImageError if image fails to load
              style={{ maxWidth: "100%", height: "auto" }} // Ensure the image scales properly
            />
          ) : (
            imageError && <p>Failed to load image.</p> // Show error message if image fails to load
          )}
        </div>
      )}
    </div>
  );
}
