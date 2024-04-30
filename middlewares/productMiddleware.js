const Product = require("../models/Product")
var fs = require('fs');
var path = require('path');
const Category = require("../models/Category");

// Add Product
const CreateNewProduct = (req, res) => {
    const { name, price, category, company } = req.body;
    if (name, price, category, company) {
        if (req.file == undefined) {
            return res.status.json({
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
            res.status(201).json({
                message: "Product add successfully.",
            })
        }
    } else {
        res.status(401).json({ message: "product field required:- name, price, category, image, company" });
    }
}

// Show All Products
const getAllProducts = async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        // Perform the aggregation
        Product.aggregate([
            {
                $lookup: {
                    from: 'categories', // The collection to join with
                    localField: 'category', // The field from the current collection
                    foreignField: '_id', // The field from the joined collection
                    as: 'category' // The alias for the joined data
                }
            },
            {
                $unwind: '$category' // Unwind the joined data array
            }
        ])
            .then(products => {
                console.log(products);
                res.json(products);

            })
            .catch(err => {
                res.json(err);
                console.error(err);
            });

        //res.json(products)
    } else {
        res.json({ result: "No Product Found." });
    }
}

// Get Single Product
const GetSingleProduct = async (req, res) => {
    let result = await Product.findOne({ _id: res.params.id });
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(401).json({ "Result": "No Record Found." });
    }
}

// Update Product
const updateProduct = async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.json(result);
}

// Delete Product
const DeleteProduct = async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.json(req.params);
}

// Search Product
const SearchProduct = async (req, res) => {
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
    res.json(result);
}

module.exports = {
    CreateNewProduct,
    getAllProducts,
    GetSingleProduct,
    DeleteProduct,
    updateProduct,
    SearchProduct
}