// models/Form.js

import mongoose from "mongoose";

// Define the form schema
const formSchema = new mongoose.Schema(
  {
    formId: {
      type: String,
      required: true,
      unique: true,
      default: () => Math.random().toString(36).substring(2, 15), // Generates a random unique string
    },
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    ebookLink: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// Check if the model already exists to avoid recompiling the model on hot reload in development
const Form = mongoose.models.Form || mongoose.model("Form", formSchema);

export default Form;
