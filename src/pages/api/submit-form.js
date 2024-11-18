import { connectToDatabase } from "@/lib/mongodb";
// import Form from "@/models/Form";
import Form from "../../app/models/Form";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, bio, ebookLink, imageUrl } = req.body;

  await connectToDatabase();

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
