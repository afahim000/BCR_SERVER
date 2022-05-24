//Callback Functions for the Views Routes

const catchAsync = require('../utils/catchAsync');

//Render the Overview Page.Callback Function
exports.getOverview = catchAsync(async (req, res, next) => {
  //  Render that template for the client
  res.status(200).render('overview', { title: 'Overview' });
});
