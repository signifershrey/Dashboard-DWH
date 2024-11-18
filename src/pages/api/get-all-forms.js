// pages/api/get-all-forms.js
import { connectToDatabase } from "../../lib/mongodb";
import Form from "../../app/models/Form";

export default async function handler(req, res) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all form details from the database
    const forms = await Form.find({});

    // Return the forms as JSON
    res.status(200).json({ success: true, forms });
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
