import { createUploadthingHandler } from "uploadthing/server";

const uploadthing = createUploadthingHandler({
  image: {
    types: ["image/jpeg", "image/png"], // Allowed file types
    maxFileSize: "4MB", // Max file size
  },
});

export const POST = uploadthing;
