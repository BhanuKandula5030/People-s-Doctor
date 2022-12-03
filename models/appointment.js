const mongoose = require("mongoose");

let appointmentSchema  = new mongoose.Schema({
    firstName: String,
    middleName: String,
    LastName: String,
    date: String,
    gender: String,
    isBooked: Boolean, 
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

module.exports = mongoose.model("Appointment", appointmentSchema);