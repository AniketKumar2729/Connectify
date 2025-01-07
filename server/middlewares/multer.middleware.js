import multer from "multer";

// Multer configuration
const multerUpload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5,  // 5 MB limit
    },
});

// Multer middleware to handle avatar image upload
const singleAvatar = multerUpload.single("avatar");  // Ensure "avatar" is the correct field name

// Multer middleware for handling file uploads in chat messages
const attachmentsMulter = multerUpload.array("files", 5);

export { singleAvatar, attachmentsMulter };
