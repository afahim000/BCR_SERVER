const fs = require('fs');
//Mongoose framework
const mongoose = require('mongoose');
//Enviroment Variables
const dotenv = require('dotenv');
//Read the config File nad save it to node.js
dotenv.config({ path: './config.env' });
//console.log(process.env.NODE_ENV)
//Enviroment Variables. Development vs Production

//Connect to the MongoDB database

//Address to our database from the config.env file
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
//connect to the database with mongoose
mongoose
  .connect(DB)
  .then(() => console.log('You are connected to the MongoDB database\n'));
