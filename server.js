const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 1 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

function list(path) {
  const Model = require(path)
  Model.findAll({}).then(items => {
    console.log(`\n${path}\n`)
    console.log(items.map(item => item.dataValues))
  })
}

sequelize.sync({ force: false }).then(() => {
  // User.describe().then(x => {
  //   console.log(x)
  // })

  // node --watch server
  list('./models/User')
  list('./models/Workout')

  app.listen(PORT, () => function(err){
    if (err) {
      console.log(err)
    }
    console.log(`Now listening on port ${PORT} http://localhost:${PORT}/`)
    }
  );
});