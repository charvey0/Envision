const path = require('path');
const express = require('express');
const session = require("express-session");
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const cloudinary = require('cloudinary').v2;



const formData = require("express-form-data");
const os = require("os");

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};



// const multer = require('multer');

// // Set Storage Engine
// const storage = multer.diskStorage({
//   destination: './public/uploads',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// })

// // Init Upload
// const upload = multer({
//   storage: storage
// }).single('myArtwork');

// const upload = require('express-fileupload');

const sequelize = require('./config/connection');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

const hbs = exphbs.create({ helpers });
// const hbs = exphbs.create({});

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(upload())
app.use(routes);

// app.post('/api/post/upload', (req, res) => {
//   // res.send('test')
//   upload(req, res, (err) => {
//     if (err) {
//       res.render('artwork', {
//         msg: err
//       })
//     } else {
//       console.log(req.file);
//       res.send('test')
//     }
//   })
// })

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// app.listen(PORT, () => console.log('Now listening'));


// DB_NAME = envision_db
// DB_PASSWORD = password
// DB_USER = root
// SESSION_SECRET = super_secret_session

// "start": "node seeds/index.js && node server.js",