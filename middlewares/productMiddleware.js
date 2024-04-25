const Product = require("../models/Product")
var fs = require('fs');
var path = require('path');

// Add Product
const CreateNewProduct = (req, resp) => {
    if (req.file == undefined) {
        return resp.send({
            message: "You must select a file.",
            reposnse: req.body,
            image: req.file
        });
    } else {
        var obj = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            userid: req.body.userid,
            company: req.body.company,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        Product.create(obj)
        console.log(req.file.filename)
        // Respond with the file details
        resp.send({
            message: "Product add successfully.",
            //file_name: req.file.filename,
        })
    }
}

// Show All Products
const getAllProducts = async (res, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No Product Found." });
    }
}

// Get Single Product
const GetSingleProduct = async (res, resp) => {
    let result = await Product.findOne({ _id: res.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ "Result": "No Record Found." })
    }
}

// Update Product
const updateProduct = async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result);
}

// Delete Product
const DeleteProduct = async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(req.params);
}

// Search Product
const SearchProduct = async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            },
        ]
    });
    resp.send(result);
}

module.exports = {
    CreateNewProduct,
    getAllProducts,
    GetSingleProduct,
    DeleteProduct,
    updateProduct,
    SearchProduct
}