const express = require("express"),
  testApp = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aditya:aditya@aighteamc1.bmxwix1.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
});

const Doctor = require("./models/doctor");

testApp.get("/sendJson", function(req, res){
  res.json({TeamName: "aighteam", Subject: "JSON testing"});
})

testApp.get("/doctor/all", function (req, res) {
  Doctor.find({}, function (err, allDoctors) {
    if (err) {
      console.log("All doctors retrieval error");
      console.log(err);
    } else {
      // console.log(allDoctors);
      // console.log(res);
      res.send({ firstDoctor: allDoctors[0] });
    }
  });
});

module.exports = testApp;
