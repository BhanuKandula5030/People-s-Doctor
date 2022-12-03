const express = require("express");
const doctor = require("../models/doctor");
const Info = require("../models/info");
const Appointment = require("../models/appointment");
const Disease = require("../models/disease");
const router = express.Router();

//here we are pulling appointments and diseases  
router.get("/", function (req, res) {
  Appointment.find({}, function (err, appointments) {
    if (err) {
      console.log(err);
    } else {
      Disease.find({}, (err, diseases) => {
        if (err) {
          console.log("Get all diseases error: " + err);
        } else {
          res.render("dashboards/index.ejs", { appointments: appointments, diseases: diseases });
        }
      });
    }
  });
});

// here we are pulling the unique doctor ID from the information form
router.get("/information/form/:id", function (req, res) {
  var doctorID = req.params.id;
  res.render("dashboards/informationForm", { doctorID: doctorID });
});

// here we are getting the details from the patient and storing it in the database
router.post("/information/post/:id", function (req, res) {
  Info.create(
    {
      name: req.body.name,
      email: req.body.email,
      insuranceProvider: req.body.insuranceProvider,
      address: req.body.address,
      period: req.body.period,
      facing: req.body.facing,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("New Info created: " + info);
        res.send(req.body.name + ", you details were sucessfully submitted");
      }
    }
  );
});

// appointment booking on respective doctor profile
router.get("/appointment/form/:id", function (req, res) {
  var doctorID = req.params.id;
  // res.send("fasdfasd")
  res.render("dashboards/bookappointment.ejs", { doctorID: doctorID });
});

// storing user related information for appointment and sending a confirmation message with patient's first name
router.post("/appointment/post/:id", function (req, res) {
  Appointment.create(
    {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      LastName: req.body.LastName,
      date: req.body.date,
      gender: req.body.gender,
      isBooked: false,
    },
    function (err, appointment) {
      if (err) {
        console.log(err);
      } else {
        console.log(appointment);
        res.render("dashboards/confirmation", {
          firstName: req.body.firstName,
        });
      }
    }
  );
});

// getting appointments using appointmentID
router.get("/appointment/:appointmentId", (req, res) => {
  var appointment_id = req.params.appointmentId;
  Appointment.findById(appointment_id, (err, appoi) => {
    if (err) {
      console.log(err);
    } else {
      console.log(appoi);
      res.render("dashboards/bookings", { appointment: appoi });
    }
  });
});

// checkout page baed on appointmentID
router.get("/appointment/:appointmentId/checkout", (req, res) => {
  var appointment_id = req.params.appointmentId;
  Appointment.findById(appointment_id, (err, appoi) => {
    if (err) {
      console.log(err);
    } else {
      console.log(appoi);
      res.render("dashboards/checkout", { appointment: appoi });
    }
  });
});

// confirmation page based on appointmentID 
router.post("/appointment/:appointmentId/checkout", (req, res) => {
  var appointment_id = req.params.appointmentId;
  Appointment.updateOne(
    { _id: appointment_id },
    { isBooked: true },
    (err, appointment) => {
      Appointment.findById(appointment_id, (err, appointe) => {
        console.log(appointe);
        res.render("dashboards/confirmation", {
          firstName: appointe.firstName,
        });
      });
    }
  );
});

module.exports = router;
