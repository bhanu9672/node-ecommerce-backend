const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Database connection
require("./db/config");

const productRoute = require("./routes/productRouter")
const userRoute = require("./routes/userRouter")

const env = require("dotenv");
const app = express();
env.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* 
    Routes For users, products, Product Category
*/
app.use( "/", productRoute )
app.use( "/", userRoute )

const PORT = process.env.PORT;

const whitelist = [
    '*'
];

app.use((req, res, next) => {
    const origin = req.get('referer');
    const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
    if (isWhitelisted) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    // Pass to next layer of middleware
    if (req.method === 'OPTIONS') res.sendStatus(200);
    else next();
});

const setContext = (req, res, next) => {
    if (!req.context) req.context = {};
    next();
};
app.use(setContext);

app.listen(PORT);