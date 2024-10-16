const express = require('express');
const app = express();
require('dotenv').config()
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute")

app.use('/api/users', userRoute);
const port = process.env.PORT || 5000;

// console.log(process.env.MONGO_URL)
app.listen(port, () => console.log(`listening on port ${port}`));








