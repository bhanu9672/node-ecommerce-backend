const express = require( "express" )
const router = express.Router();

const multer = require("multer")
var fs = require('fs');
var path = require('path');

const Product = require("../models/Product");
const { getAllProducts, GetSingleProduct, DeleteProduct, updateProduct, SearchProduct, CreateNewProduct } = require("../middlewares/productMiddleware");

// Show All Products Api
router.get("/products", getAllProducts);

// Delete Product Api
router.delete("/product/:id", DeleteProduct);

// Get Single Product Api
router.get("/product/:id", GetSingleProduct);

// Update Product Api
router.put("/product/:id", updateProduct);

// Api For Search Product
router.get('/search/:key', SearchProduct);

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

// Add Produt Api
router.post("/add-product", upload.single("file"), CreateNewProduct );

module.exports = router;