const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    number: Number,
    password: String
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("users", userSchema);