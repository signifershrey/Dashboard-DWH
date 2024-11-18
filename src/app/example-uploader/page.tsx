// // // "use client";

// // // import { UploadButton } from "@/utils/uploadthing";

// // // export default function Home() {
// // //   return (
// // //     <main className="flex min-h-screen flex-col items-center justify-between p-24">
// // //       <UploadButton
// // //         endpoint="imageUploader"
// // //         onClientUploadComplete={(res) => {
// // //           // Do something with the response
// // //           console.log("Files: ", res);
          
          
// // //           alert("Upload Completed");
// // //         }}
// // //         onUploadError={(error: Error) => {
// // //           // Do something with the error.
// // //           alert(`ERROR! ${error.message}`);
// // //         }}
// // //       />
// // //     </main>
// // //   );
// // // }// "use client";

// // // import { UploadButton } from "@/utils/uploadthing";

// // // export default function Home() {
// // //   return (
// // //     <main className="flex min-h-screen flex-col items-center justify-between p-24">
// // //       <UploadButton
// // //         endpoint="imageUploader"
// // //         onClientUploadComplete={(res) => {
// // //           // Do something with the response
// // //           console.log("Files: ", res);
          
          
// // //           alert("Upload Completed");
// // //         }}
// // //         onUploadError={(error: Error) => {
// // //           // Do something with the error.
// // //           alert(`ERROR! ${error.message}`);
// // //         }}
// // //       />
// // //     </main>
// // //   );
// // // }
// // "use client";

// // import { useState } from "react";
// // import { UploadButton } from "@/utils/uploadthing";

// // export default function FormPage() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     bio: "",
// //     ebookLink: "",
// //     imageUrl: "",
// //   });
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleInputChange = (e:any) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e:any) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     try {
// //       const response = await fetch("/api/submit-form", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log("Form submission successful:", result);
// //         alert("Form submitted successfully!");
// //         setFormData({
// //           name: "",
// //           bio: "",
// //           ebookLink: "",
// //           imageUrl: "",
// //         }); // Reset the form
// //       } else {
// //         console.error("Form submission failed:", response.statusText);
// //         alert("Failed to submit the form. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error("Error during form submission:", error);
// //       alert("An error occurred while submitting the form. Please try again.");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Form with Image Upload</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Name:</label>
// //           <input
// //             type="text"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Bio:</label>
// //           <textarea
// //             name="bio"
// //             value={formData.bio}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Ebook Link:</label>
// //           <input
// //             type="url"
// //             name="ebookLink"
// //             value={formData.ebookLink}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label>Image:</label>
// //           <UploadButton
// //             endpoint="imageUploader"
// //             onClientUploadComplete={(res) => {
// //               if (res && res[0] && res[0].appUrl) {
// //                 setFormData({ ...formData, imageUrl: res[0].appUrl });
// //                 alert("Image uploaded successfully!");
// //               }
// //             }}
// //             onUploadError={(error) => {
// //               alert(`Image upload failed: ${error.message}`);
// //             }}
// //           />
// //           {formData.imageUrl && (
// //             <p>
// //               Uploaded Image:{" "}
// //               <a
// //                 href={formData.imageUrl}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //               >
// //                 View
// //               </a>
// //             </p>
// //           )}
// //         </div>
// //         <button type="submit" disabled={isSubmitting}>
// //           {isSubmitting ? "Submitting..." : "Submit"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }
// // // 



"use client";

import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    ebookLink: "",
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Form submission successful:", result);
        alert("Form submitted successfully!");
        setFormData({
          name: "",
          bio: "",
          ebookLink: "",
          imageUrl: "",
        }); // Reset the form
      } else {
        console.error("Form submission failed:", response.statusText);
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#ffbb02] mb-4">
          Submit Information
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
          <input
            type="url"
            name="ebookLink"
            placeholder="Ebook Link"
            value={formData.ebookLink}
            onChange={handleInputChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbb02] focus:border-transparent"
          />
          <div className="space-y-2">
            <label className="block text-gray-700">Upload Image:</label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0] && res[0].appUrl) {
                  setFormData({ ...formData, imageUrl: res[0].appUrl });
                  alert("Image uploaded successfully!");
                }
              }}
              onUploadError={(error) => {
                alert(`Image upload failed: ${error.message}`);
              }}
            />
            {formData.imageUrl && (
              <p>
                Uploaded Image:{" "}
                <a
                  href={formData.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffbb02] underline"
                >
                  View
                </a>
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3 bg-[#ffbb02] text-white font-semibold rounded-md hover:bg-[#e6a600] focus:outline-none focus:ring-2 focus:ring-[#e6a600] focus:ring-opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
