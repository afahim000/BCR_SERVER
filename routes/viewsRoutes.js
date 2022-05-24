const express = require('express');
//import the controller for rendering the pages
const viewsController = require('../controllers/viewsController');

const router = express.Router();

// Root address. Authentication and Render Overview
//Routes HTTP GET requests to the specified path with the specified callback functions.
router.get('/', viewsController.getOverview);
//Export the entire module
module.exports = router;
