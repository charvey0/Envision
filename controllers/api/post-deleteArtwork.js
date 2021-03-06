const router = require('express').Router();
// const fileUpload = require('express-fileupload');
const withAuth = require('../../utils/auth')
const { User, Artwork } = require('../../models');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dz52vqg3p',
    api_key: '412443397181723',
    api_secret: 'q-mf7e4S7u-oJqmK9BeXOqne7oU',
})


router.get('/', (req, res) => {
    res.render('postArtwork', {
        loggedIn: req.session.loggedIn,
        first_name: req.session.first_name,
        last_name: req.session.last_name,
        user_id: req.session.user_id
    })
})

router.post('/submit', withAuth, async (req, res) => {
    // console.log(req.files.path);
    const filePath = req.body.file.path;
    console.log(filePath);
    // console.log(req.files);
    var fileNewUrl;
    await cloudinary.uploader.upload(filePath, async (err, result) => {
        if (err) {
            res.status(500).json(err)
            res.render('postArtwork', {
                msg: err
            })
        } else {
            console.log(result);

        }
        if (!result.url) {
            fileNewUrl = 'https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673.png'
        } else {
            fileNewUrl = result.url;
        }



        try {

            const newArtwork = await Artwork.create({
                user_id: req.session.user_id,
                title: req.body.artwork_title,
                grade_level: req.body.grade_value,
                description: req.body.description_artwork,
                links: req.body.artwork_link,
                repo_link: req.body.repo_link,
                file_path: fileNewUrl
            });
            console.log(newArtwork);
            res.status(200).json(newArtwork);
            // res.render('')
        } catch (err) {
            console.log(err);

            res.status(500).json(err)
        }
    })



})


router.delete('/:id', withAuth, async (req, res) => {
    console.log("delete started");
    try {
        const artworkData = await Artwork.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        console.log(artworkData);
        if (!artworkData) {
            res.status(404).json({ message: 'No artwork found with this id!' });
            return;
        }

        res.status(200).json(artworkData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// const path = require('path');
// const multer = require('multer');

// // Set Storage Engine
// const storage = multer.diskStorage({
//     destination: './public/uploads',
//     filename: function (req, file, cb) {
//         // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//         const ext = path.extname(file.originalname);
//         const file_path = `artworks/${file.fieldname}${Date.now()}${ext}`;
//         Artwork.create({ file_path })
//             .then(() => {
//                 cb(null, file_path);
//             })
//     }
// });

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




// router.post('/upload', async (req, res) => {
//     // res.send('test')
//     console.log(req.body);
//     await upload(req, res, (err) => {
//         if (err) {
//             res.render('artwork', {
//                 msg: err
//             })
//         } else {
//             // console.log(req.file);
//             // res.send('test')
//             if (req.file == undefined) {
//                 res.render('artwork', {
//                     msg: 'Error: No file selected!'
//                 });
//             } else {
//                 res.render('artwork', {
//                     msg: "File Uploaded!",
//                     // file: `../uploads/${req.filename}`
//                 });
//                 console.log(req.file);
//                 console.log(req.body);
//             }
//         }

//     });


// });


module.exports = router;