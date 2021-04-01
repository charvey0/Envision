const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Assigning routes
const htmlRoutes = require('./controllers/routesController');

// app.use(routes);
app.use(htmlRoutes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
