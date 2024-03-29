const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const healthRoute = require('./route/healthRoute');
const ingredientRoute = require('./route/IngredientRoute');
const recipeRoute = require('./route/RecipeRoute');
const productRoute = require('./route/ProductRoute');
const serviceRoute = require('./route/ServiceRoute');
const saleRoute = require('./route/saleRoute');
const catalogRoute = require('./route/CatalogRoute');
const userRoute = require('./route/UserRoute');
const reviewRoute = require('./route/ReviewRoute');
const settingRoute = require('./route/SettingRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(fileUpload({
  limits: {
    fileSize: 1000000, // 1mb
  },
  abortOnLimit: true,
}));

app.use('/health', healthRoute);
app.use('/ingredient', ingredientRoute);
app.use('/recipe', recipeRoute);
app.use('/product', productRoute);
app.use('/service', serviceRoute);
app.use('/sale', saleRoute);
app.use('/catalog', catalogRoute);
app.use('/user', userRoute);
app.use('/review', reviewRoute);
app.use('/setting', settingRoute);

const port = process.env.port || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
