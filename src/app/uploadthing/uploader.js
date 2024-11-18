// "use client";
// import { useUploadThing } from "@/utils/uploadthing";
// import { useState } from "react";

// const Uploader = ({ onUpload }) => {
//   const [file, setFile] = useState(null); // Single file selection
//   const { startUpload, isUploading } = useUploadThing("image");

//   const handleUpload = async () => {
//     if (!file) return;

//     try {
//       // Upload the selected file
//       const uploadedFiles = await startUpload([file]); // Convert single file to array
//       if (uploadedFiles && uploadedFiles.length > 0) {
//         const uploadedUrl = uploadedFiles[0].url; // Get the uploaded file URL
//         onUpload(uploadedUrl); // Callback with the uploaded file's URL
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//     }
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0]; // Get the first file
//     setFile(selectedFile); // Save the file in state
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         disabled={isUploading}
//       />
//       <button onClick={handleUpload} disabled={isUploading || !file}>
//         {isUploading ? "Uploading..." : "Upload"}
//       </button>
//     </div>
//   );
// };

// export default Uploader;
