const fs = require('fs');
const Tour = require('../models/tourModel');

// exports.checkID = (req, res, next, val) => {
//     const selectedTour = tours.find(tour => tour.id === +val)
//     if (!selectedTour) {
//         return res.status(404).json({
//             status: 'failed',
//             message: 'Invalid ID selected...'
//         })
//     }
//     next();
// }


exports.getAllTours = async (req, res) => {
    try {
        // BUILD QUERY
        // 1) FILTERING
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(field => delete queryObj[field])

        // 2) ADVANCED FILTERING
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))
        const query = Tour.find(JSON.parse(queryStr));

        // EXECUTE QUERY
        const tours = await query;

        // SEND RESPONSE 
        res.status(200).json({
            status: 'success',
            results: tours.length,
            requestedAt: req.requestTime,
            data: {
                tours: tours
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.getTourById = async (req, res) => {
    try {
        const selectedTour = await Tour.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: {
                tour: selectedTour
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: "success",
            tour: newTour
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            // error: error.message
            error: 'Invalid data sent!'
        })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data: {
                tour: tour
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error.message
        })
    }
}
