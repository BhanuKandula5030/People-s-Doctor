var mongoose = require("mongoose");

var diseaseSchema = new mongoose.Schema({
    disease: String,
    symptoms: [String]
});

module.exports = mongoose.model("Disease", diseaseSchema);