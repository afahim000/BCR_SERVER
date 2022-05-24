const express = require('express');
const animalController = require('../controllers/animalController');

const router = express.Router();
router
  .route('/top-10-spots')
  .get(animalController.aliasTopSpots, animalController.getAllAnimals);
router
  .route('/')
  .get(animalController.getAllAnimals)
  .post(animalController.createAnimal);
router
  .route('/:id')
  .get(animalController.getAnimal)
  .patch(animalController.updateAnimal)
  .delete(animalController.deleteAnimal);

module.exports = router;
