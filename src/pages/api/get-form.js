// /pages/api/get-form.js

import { connectToDatabase } from "@/lib/mongodb";
import Form from "../../app/models/Form";

export default async function handler(req, res) {
  const { formId } = req.query;

  if (!formId) {
    return res.status(400).json({ message: "Form ID is required" });
  }

  // Connect to the database
  const { conn } = await connectToDatabase();

  try {
    // Retrieve the form by formId (or you can use _id instead)
    const form = await Form.findOne({ formId });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    return res.status(500).json({ message: "Error fetching form" });
  }
}
