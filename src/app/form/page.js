// "use client";

// import { useState } from "react";
// import Uploader from "@/app/uploadthing/uploader";

// export default function FormPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     bio: "",
//     ebookLink: "",
//     imageUrl: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted: ", formData);

//     // Add your form submission logic here (e.g., API call)
//   };

//   return (
//     <div>
//       <h1>Form with Image Upload</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Bio:</label>
//           <textarea
//             name="bio"
//             value={formData.bio}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Ebook Link:</label>
//           <input
//             type="url"
//             name="ebookLink"
//             value={formData.ebookLink}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Image:</label>
//           <Uploader
//             onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
//           />
//           {formData.imageUrl && (
//             <p>
//               Uploaded Image: <a href={formData.imageUrl}>View</a>
//             </p>
//           )}
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
