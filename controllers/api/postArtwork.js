const router = require('express').Router();
// const fileUpload = require('express-fileupload');
const { User, Artwork } = require('../../models');

const path = require('path');
const multer = require('multer');

// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        const ext = path.extname(file.originalname);
        const file_path = `artworks/${file.fieldname}${Date.now()}${ext}`;
        Artwork.create({ file_path })
            .then(() => {
                cb(null, file_path);
            })
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myArtwork');

function checkFileType(file, cb) {
    const extuploaded = path.extname(file.originalname).toLowerCase();

    // Allowed ext
    const filetypes = /rar|jpeg|jpg|png|gif/

    // Check ext
    const extname = filetypes.test(extuploaded);
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(`Error: File type: ${extuploaded} not accepted. Images and zip files only`)
    }
}


router.get('/', (req, res) => {
    res.render('artwork', {
        loggedIn: req.session.loggedIn
    })
})

// router.post('/upload', (req, res) => {
//     // res.send('test')
//  upload(req, res, (err) => {
//     if (err) {
//         res.render('artwork', {
//             msg: err
//         })
//     } else {
//         // console.log(req.file);
//         // res.send('test')
//         if (req.file == undefined) {
//             res.render('artwork', {
//                 msg: 'Error: No file selected!'
//             });
//         } else {
//             res.render('artwork', {
//                 msg: "File Uploaded!",
//                 // file: `../uploads/${req.filename}`
//             });
//             console.log(req.file);
//         }
//     }

// });

router.post('/upload', async (req, res) => {
    // res.send('test')
    console.log(req.body);
    await upload(req, res, (err) => {
        if (err) {
            res.render('artwork', {
                msg: err
            })
        } else {
            // console.log(req.file);
            // res.send('test')
            if (req.file == undefined) {
                res.render('artwork', {
                    msg: 'Error: No file selected!'
                });
            } else {
                res.render('artwork', {
                    msg: "File Uploaded!",
                    // file: `../uploads/${req.filename}`
                });
                console.log(req.file);
                console.log(req.body);
            }
        }

    });

    // try {

    //     const newArtwork = await Artwork.create({
    //         user_id: req.session.id,
    //         title: req.body.title_artwork,
    //         grade_level: req.body.grade_value,
    //         file_name: req.filename
    //     });
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json(err)
    // }
});


module.exports = router;