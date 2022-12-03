const express = require("express"),
  app = express();
const router = require(".");
const doctor = require("../models/doctor");
const Doctor = require("../models/doctor");
var middleware = require("../middleware")   

// doctor profile
router.get("/doctorForm", middleware.isAdminLoggedIn, function (req, res) {
  res.render("doctors/doctorForm.ejs");
});

// doctor details form and after successful creation of doctor profile display "Doctor created"
router.post("/", middleware.isAdminLoggedIn, function (req, res) {
  Doctor.create(
    {
      name: req.body.name,
      department: req.body.department,
      rating: req.body.rating,
      specialities: req.body.specialities,
      experience: req.body.experience,
      successRate: req.body.successRate,
      description: req.body.description,
    },
    function (err, newDoctor) {
      if (err) {
        console.log("Doctor creation error!");
        console.log(err);
      } else {
        console.log("Doctor Created");
        console.log(newDoctor);
        res.redirect("/doctor/all");
      }
    }
  );
});

// retrieving all doctors
router.get("/all", function (req, res) {
  Doctor.find({}, function (err, allDoctors) {
    if (err) {
      console.log("All doctors retrieval error");
      console.log(err);
    } else {
      res.render("doctors/allDoctors.ejs", { allDoctors: allDoctors });
    }
  });
});

// best doctors based on success rate sorting
router.get("/bestDoctors", (req, res) => {
  Doctor.find({}, (err, doctors) => {
    if(err){
      console.log(err);
    }else{
      res.render("doctors/bestDoctors.ejs", { allDoctors: doctors.sort((a, b) => a.successRate - b.successRate).reverse() });
    }
  })
})

router.post("/doctors", function (req, res) {
  var departmentName = req.body.departmentName;
  // finding all doctors of same department, and ---- { $regex: departmentName, $options: 'i' } ---
  //   ----- to make mongoose search without considering smallercase or uppercase
  Doctor.find(
    { department: { $regex: departmentName, $options: "i" } },
    function (err, doctors) {
      if (err) {
        console.log(err);
      } else {
        console.log(doctors);
        res.render("doctors/doctors", { doctors: doctors, departmentName: departmentName });
      }
    }
  );
});

// individual doctor page by using unique doctor ID 
router.get("/doctors/:id", function(req, res){
  Doctor.findById(req.params.id).exec(function(err, doctor){
    if(err){
      req.flash(err);
      console.log(err);
    }else{
      res.render("doctors/doctor", {doctor: doctor});
    }
  })
})

module.exports = router;
