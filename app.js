//Express Framework for Node.js
const express = require('express');
const path = require('path');
const morgan = require('morgan');

//import routes
const viewsRouter = require('./routes/viewsRoutes');
const animalRouter = require('./routes/animalRoutes');
// const userRouter = require('./routes/userRoutes');

//start express app
const app = express();

//Serving static files outside the routes. From Root
app.use(express.static(`${__dirname}/public`));
//Morgan, loggin Middleware to CONSOLE for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Pug engine to render webpages templates
app.set('view engine', 'pug');
//template  folder location for Pug
app.set('views', path.join(__dirname, 'views'));
//Json middleware.Body Parser. Incoming Request
app.use(express.json());
//request time middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  //go to the next middleware
  next();
});

//MOUNTING THE ROUTERS
//If you are in Root go to the viewRoutes(MiddleWare for Routes)
app.use('/', viewsRouter);
//If you are in animal node, go to the animalroutes
app.use('/api/v1/animal', animalRouter);
//user Route
// app.use('/api/v1/users', userRouter);
//Model

//export this program
module.exports = app;
