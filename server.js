const express = require('express');
const path = require('path');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const session = require('express-session');
const methodOverride = require('method-override');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Import models
const {User, Post, Comment} = require('./models');

//Set up expess
const app = express();
const PORT = process.env.PORT || 3001;

//Set up handlebars.js engine with custom helpers
const hbs =exphbs.create({ helpers });

//Set up sessions
const sess = {
    secret: 'Super secret secret',
    cookie: {
        //stored in milliseconds
        maxAge: 24 * 60 * 60 * 1000, //expires after 1 day
    },
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

app.use(methodOverride('_method'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const routes =  require('./controllers');
app.use(routes);

// Sync sequelize models to the database, and turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App running on port ${PORT}`));
});