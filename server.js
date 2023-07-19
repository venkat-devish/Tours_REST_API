const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
dotenv.config({ path: './config.env' })

const app = express();
const port = process.env.PORT || 7000;

// MIDDLEWARES
app.use(express.json())

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.use(morgan('dev'))

app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString();
    next()
})


// ROUTES
// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTourById)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.listen(port, () => {
    console.log("Server is up and running...")
})
