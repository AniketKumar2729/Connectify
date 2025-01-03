import multer from "multer";
//this multer is used so that
 const multerUpload=multer({
    limits:{
        fileSize:1024*1024*5,
    },fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
})
const singleAvatar=multerUpload.single("avatar");
const attachmentsMulter=multerUpload.array("files",5);
export {singleAvatar,attachmentsMulter}