const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require("./app");


dotenv.config({ path: './config.env' })

const port = process.env.PORT || 7000;
const DB = process.env.DB_CONNECTION_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);
const DB_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

mongoose.connect(DB, { ...DB_OPTIONS }).then(() => {
    console.log('DB connection successs...')
})


app.listen(port, () => {
    console.log(`Server is up and running at ${port}`)
})  