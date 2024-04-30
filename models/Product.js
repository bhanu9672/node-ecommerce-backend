const mongoose = require( "mongoose" );

const productSchema = new mongoose.Schema({
    name : String,
    price : String,
    sale_price : String,
    category : String,
    userid : String,
    company : String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
},
{
    timestamps : true
}
);

module.exports = mongoose.model( "products", productSchema );