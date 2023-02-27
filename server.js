//Mongoose framework
const mongoose = require('mongoose');
//Enviroment Variables
const dotenv = require('dotenv');
//Read the config File nad save it to node.js
dotenv.config({ path: './config.env' });
//console.log(process.env.NODE_ENV)
//Enviroment Variables. Development vs Production

//Import the module App.js (with express in app.js)
const app = require('./app');

//Connect to the MongoDB database

//Address to our database from the config.env file
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
//connect to the database with mongoose
mongoose.connect(DB).then(() => {
  if (process.env.NODE_ENV === 'development')
    console.log('You are connected to the MongoDB database\n');
});

//Server Portion
const port = process.env.PORT || 3000;
// start the server to listen using express
app.listen(port, () => {
  //if (process.env.NODE_ENV === 'development') {
  console.log(`The Server is UP and Running in port http://localhost:${port}\n`);
  //}
});
