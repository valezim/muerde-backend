const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const healthRoute = require('./route/healthRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/health', healthRoute);

const port = process.env.SERVER_PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
