// const path = require('path');
// const multer = require('multer');


// // Set Storage Engine
// const storage = multer.diskStorage({
//     destination: './public/uploads',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// })

// // Init Upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 3000000 },
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('myArtwork');


// function checkFileType(file, cb) {
//     const extuploaded = path.extname(file.originalname).toLowerCase();

//     // Allowed ext
//     const filetypes = /rar|jpeg|jpg|png|gif/

//     // Check ext
//     const extname = filetypes.test(extuploaded);
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(`Error: File type: ${extuploaded} not accepted. Images and zip files only`)
//     }
// }

// module.exports = uploadFile;