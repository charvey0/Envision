
const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    res.render('artwork', {
        loggedIn: req.session.loggedIn
    })
})

// router.post('/', function (req, res) {
//     let sampleFile;
//     let uploadPath;

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     sampleFile = req.files.sampleFile;
//     uploadPath = __dirname + '/somewhere/on/your/server/' + sampleFile.name;

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(uploadPath, function (err) {
//         if (err)
//             return res.status(500).send(err);

//         res.send('File uploaded!');
//     });
// });

// router.post('/', (req, res) => {
//     console.log(req.files);
//     // if (req.files) {
//     //     console.log(req.files);
//     //     const file = req.files.file
//     //     const filename = file.name
//     //     console.log(filename);
//     // }
// })

module.exports = router;