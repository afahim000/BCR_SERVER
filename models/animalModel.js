const mongoose = require('mongoose');
//A Schema is like a blueprint
const animalSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: [true, 'Need an ID number'],
  },
  format: {
    type: String,
    default: 'NA',
    trim: true,
  },
  CommonName: {
    type: String,
    default: 'NA',
    required: [true, 'Need a Common Name'],
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    default: 5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  user: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [40, 'A user name must have less or equal then 40 characters'],
    minlength: [3, 'A user name must have more or equal than 3 characters'],
    select: false,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  year: {
    type: Date,
    default: Date.now(),
  },
});
//Save our model in the database called "animals" with the Schema "animalSchema"
const Animal = mongoose.model('animals', animalSchema);

module.exports = Animal;
