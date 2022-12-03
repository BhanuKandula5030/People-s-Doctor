var mongoose = require("mongoose")

infoSchema = new mongoose.Schema({
    name: String,
    email: String,
    insuranceProvider: String,
    address: String,
    period: String,
    facing: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

module.exports = mongoose.model("Info", infoSchema)