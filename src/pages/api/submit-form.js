// // /pages/api/submit-form.js

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     // Get form data from the request body
//     const { name, bio, ebookLink, imageUrl } = req.body;

//     // Here you can add logic to save this data to a database or handle it as required
//     // For example:
//     try {
//       // For now, just log the received data
//       console.log("Form Data Received:", { name, bio, ebookLink, imageUrl });

//       // Simulate a successful form submission
//       return res.status(200).json({ message: "Form submitted successfully!" });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       return res.status(500).json({ message: "Error submitting the form" });
//     }
//   } else {
//     // Handle other HTTP methods (GET, etc.)
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
// }

// /pages/api/submit-form.js

// import { connectToDatabase } from "@/lib/mongodb";
// import Form from "@/models/Form";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { name, bio, ebookLink, imageUrl } = req.body;

//     // Connect to the database
//     const { conn } = await connectToDatabase();

//     try {
//       // Save the form data to MongoDB
//       const newForm = new Form({
//         name,
//         bio,
//         ebookLink,
//         imageUrl,
//       });

//       // Insert the form document into the database
//       const result = await newForm.save();

//       console.log("Form Data Saved:", result);
//       return res.status(200).json({ message: "Form submitted and saved successfully!" });
//     } catch (error) {
//       console.error("Error saving data to MongoDB:", error);
//       return res.status(500).json({ message: "Error saving form data" });
//     }
//   } else {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
// }

// /pages/api/submit-form.js

import { connectToDatabase } from "@/lib/mongodb";
// import Form from "@/models/Form";
import Form from "../../app/models/Form";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, bio, ebookLink, imageUrl } = req.body;

    // Connect to the database
    const { conn } = await connectToDatabase();

    try {
      // Save the form data with a custom formId
      const newForm = new Form({
        name,
        bio,
        ebookLink,
        imageUrl,
      });

      // Insert the form document into the database
      const result = await newForm.save();

      console.log("Form Data Saved:", result);
      return res.status(200).json({ message: "Form submitted and saved successfully!", formId: result.formId });
    } catch (error) {
      console.error("Error saving data to MongoDB:", error);
      return res.status(500).json({ message: "Error saving form data" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
