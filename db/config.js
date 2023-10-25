const mongoose = require( "mongoose" );
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const LOCAL_DB = "mongodb://localhost:27017/e-commerce";
const live_DB = "mongodb+srv://bhanubhanu7737gmailcom:bhanubhanu7737gmailcom@cluster0.t1hlgce.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect( MONGODB_URL );