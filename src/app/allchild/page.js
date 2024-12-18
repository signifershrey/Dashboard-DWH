"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function RetrieveAllForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch("/api/get-all-forms");
        const data = await res.json();

        if (res.ok) {
          setForms(data.forms);
        } else {
          setError(data.message || "Failed to fetch forms");
        }
      } catch (err) {
        setError(`An error occurred while fetching the forms. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) return <p>Loading forms...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Form Details</h1>
      {forms.length === 0 ? (
        <p>No forms found.</p>
      ) : (
        <div>
          {forms.map((form) => (
            <div
              key={form.formId}
              style={{
                marginBottom: "20px",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              <h2>{form.name}</h2>
              <p>{form.bio}</p>
              <a
                href={form.ebookLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ebook Link
              </a>
              {form.imageUrl && (
                <Image
                  src={form.imageUrl}
                  alt="Form Image"
                  // style={{ maxWidth: "100%", height: "auto" }}
                  width={500} // Provide width
                  height={300} // Provide height
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
