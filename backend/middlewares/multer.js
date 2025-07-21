// import multer from "multer";

// const storage = multer.diskStorage({
//     filename: function(req, file, callback){
//         callback(null,file.originalname)
//     }
// })

// const upload = multer({storage})
// export default upload
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure temp folder exists
const tempDir = './temp';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, tempDir); // Save uploads to ./temp folder
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

export default upload;
