const mongoose = require('mongoose');

// Define the schema for the product category
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    // You can add more fields as needed, such as imageUrl, parentCategory, etc.
    // Example:
    // imageUrl: String,
    // parentCategory: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'
    // }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps to the document
});

// Create a model for the product category schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
