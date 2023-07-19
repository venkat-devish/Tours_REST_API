const fs = require('fs')
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-test.json', 'utf-8'))

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedAt: req.requestedTime,
        data: {
            tours: tours
        }
    })
}

exports.getTourById = (req, res) => {
    const { id } = req.params;
    const selectedTour = tours.find(tour => tour.id === +id)

    if (!selectedTour) {
        return res.status(401).json({
            status: 'failed',
            message: 'Something is wrong!'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tours: selectedTour
        }
    })
}

exports.createTour = (req, res) => {
    const tourId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: tourId }, req.body)
    tours.push(newTour)
    fs.writeFile('./dev-data/data/tours-test.json', JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

exports.updateTour = (req, res) => {
    const { id } = req.params;
    const selectedTour = tours.find(tour => tour.id === +id)

    if (!selectedTour) {
        return res.status(401).json({
            status: 'failed',
            message: 'Something is wrong!'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tours: "<UPDATED TOUR HERE!>"
        }
    })
}

exports.deleteTour = (req, res) => {
    const { id } = req.params;
    const selectedTour = tours.find(tour => tour.id === +id)

    if (!selectedTour) {
        return res.status(401).json({
            status: 'failed',
            message: 'Something is wrong!'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
    console.log("Success")
}