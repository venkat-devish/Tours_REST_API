const express = require('express');
const dotenv = require('dotenv');
const { deleteTour, updateTour, createTour, getTourById, getAllTours } = require('./controllers/tourControllers');
const morgan = require('morgan');
dotenv.config({ path: './config.env' })

const app = express();
app.use(express.json())

const port = process.env.PORT || 7000;

const tourRouter = express.Router('/api/v1/tours');

app.use(morgan('dev'))

app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString();
    next()
})


// ROUTES
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)

app
    .route('/api/v1/tours/:id')
    .get(getTourById)
    .patch(updateTour).delete(deleteTour)


// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTourById)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.listen(port, () => {
    console.log("Server is up and running...")
})
