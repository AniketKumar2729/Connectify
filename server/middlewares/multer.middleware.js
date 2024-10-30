import multer from "multer";
//this multer is used so that
 const multerUpload=multer({
    limits:{
        fileSize:1024*1024*5,
    }
})
const singleAvatar=multerUpload.single('avatar');
export {singleAvatar}