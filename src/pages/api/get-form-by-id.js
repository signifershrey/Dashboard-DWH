// // /pages/api/get-form.js

// import { connectToDatabase } from "@/lib/mongodb";
// import Form from "../../app/models/Form";

// export default async function handler(req, res) {
//   const { formId } = req.query;

//   if (!formId) {
//     return res.status(400).json({ message: "Form ID is required" });
//   }

//   // Connect to the database
//   connectToDatabase();

//   try {
//     // Retrieve the form by formId (or you can use _id instead)
//     const form = await Form.findOne({ formId });

//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }

//     return res.status(200).json(form);
//   } catch (error) {
//     console.error("Error fetching form:", error);
//     return res.status(500).json({ message: "Error fetching form" });
//   }
// }


// pages/api/get-form-by-id.js
import { connectToDatabase } from "../../lib/mongodb";
import Form from "../../app/models/Form";

export default async function handler(req, res) {
  const { id } = req.query;  // Get the id from the URL query parameters

  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch the form by its ID
    const form = await Form.findById(id);

    // If form not found, return 404
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    // Return the form as JSON
    res.status(200).json({ success: true, form });
  } catch (error) {
    console.error("Error fetching form by ID:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
