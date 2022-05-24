const Animal = require('../models/animalModel');
const APIFeatures = require('../utils/apiFeatures');

//Middleware Top 10 spots
exports.aliasTopSpots = (req, res, next) => {
  req.query.limit = 10;
  req.query.sort = '-ratingsAverage';
  req.query.fields = 'country,year,ratingsAverage';
  next();
};

exports.getAllAnimals = async (req, res) => {
  //BUILD QUERY

  //EXECUTE QUERY
  const features = new APIFeatures(Animal.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const animals = await features.query;
  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: animals.lenght,
    data: {
      animals,
    },
  });
};
//Get only 1 animal
exports.getAnimal = async (req, res) => {
  //the MongoDB _id
  const animal = await Animal.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      animal,
    },
  });
};
exports.updateAnimal = async (req, res) => {
  const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      animal,
    },
  });
};
exports.deleteAnimal = async (req, res) => {
  await Animal.findByIdAndDelete(req.params.id);
  //204 means No Content back
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.createAnimal = async (req, res) => {
  try {
    //Calling the method directly
    const newAnimal = await Animal.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        animals: newAnimal,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err });
  }
};

//AGGREGATION PIPELINE
exports.getAnimalStats = async (req, res) => {
  //stages array
  const stats = Animal.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4 } },
    },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$ratingsAverage' },
      },
    },
  ]);
};
