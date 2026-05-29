import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import { config } from "../../config.js";

// Configure Cloudinary with credentials from config
cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
});

// CloudinaryStorage params:
// - resource_type: 'auto' lets Cloudinary accept images, videos, and raw files like PDFs
// - allowed_formats lists allowed extensions; fixed typo 'jpa' -> 'jpg'
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Elaris de Elite", // Folder in Cloudinary to store uploaded files
        resource_type: "auto",
        allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    },
});

// Export a multer parser configured to store files in Cloudinary
const parser = multer({ storage });

export default parser;

