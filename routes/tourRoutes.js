const express = require('express');
const tourController = require('../controllers/tourController')

const router = express.Router();

// router.param('id', tourController.checkID)


const { getAllTours, createTour, getTourById, updateTour, deleteTour } = tourController;

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;