import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploadDir = path.resolve(import.meta.dirname,"..","uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const randomName = crypto.randomUUID();
        const filename = `${randomName}${path.extname(file.originalname)}`;

        cb(null, filename);
    }
})

const fileFilter = (req, file, cb) => {

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp',"image/avif"];

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp','.avif'];

    const isMimeValid = allowedMimeTypes.includes(file?.mimetype);

    const fileExtension = path.extname(file.originalname).toLowerCase();

    const isvalidExtension = allowedExtensions.includes(fileExtension);

    console.log(isvalidExtension);

    if (isMimeValid && isvalidExtension) {
        cb(null, true);
    } else {
        // Decline upload with an explicit error structure
        cb(new Error("Security Alert: Invalid file format. Only JPG, JPEG, PNG, and WEBP images are allowed!"), false);

    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:5*1024*1024 //means 5 mb
    }
})