const express = require("express");
const router = express.Router();
const Disease = require("../models/disease");
const Doctor = require("../models/doctor");

// diseases list
router.get("/diseaseForm", function (req, res) {
  res.render("disease/diseasesForm");
});

// adding new diseases into the disease list and redirecting to diseases page
router.post("/disease", function (req, res) {
  var disease = req.body.disease;
  var symptoms = req.body.symptoms;
  var newDisease = {
    disease: disease,
    symptoms: symptoms,
  };
  Disease.create(newDisease, function (err, createdDisease) {
    if (err) {
      console.log("created error");
      console.log(err);
    } else {
      req.flash("success", "You have created a disease");
      console.log(createdDisease);
      res.redirect("/diseases");
    }
  });
});

// Get diseases based on symptoms

router.post("/symptoms/diseases", (req, res) => {
  console.log("=====================================");
  let sSampleSymptoms = req.body.symptoms;
  let sampleSymptoms = [];
  if (
    typeof sSampleSymptoms === "string" ||
    sSampleSymptoms instanceof String
  ) {
    sampleSymptoms.push(sSampleSymptoms);
  } else {
    sampleSymptoms = sSampleSymptoms;
  }

  sampleSymptoms.forEach(function (symptom) {
    Disease.find({ symptoms: symptom })
      .exec()
      .then((diseases) => {
        console.log("finded disease: " + diseases);
        res.render("disease/diseases", { allDiseases: diseases });
      });
  });

  // const sDiseases = [];
  // sDiseases.push("fasdfsd23e2")
  // sDiseases.push([{"name": "banu", "age": "regret"}])
  // sampleSymptoms.forEach(function(symptom){
  //     Disease.find({ symptoms: symptom }).exec().then((diseases) => {
  //         console.log("finded disease: "+ diseases);
  //         sDiseases.push(diseases[0]);
  //     });
  // })
  // console.log(sDiseases)
  // res.send("sDiseases: " + sDiseases)

});

router.get("/all-diseases", function(req, res){
  // res.render("dashboards/symptoms.ejs", {page: "symptoms"})
  Disease.find({}, function(err, allDiseases){
      if(err){
          console.log(err)
      }else{
          res.render("disease/diseases", {allDiseases: allDiseases})
      }
  })
})

// Listing out best doctors based on Success rate for each disease
router.post("/symptoms/diseases/doctors", (req, res) => {
    let speciality = req.body.diseaseName;
    console.log(speciality)
    Doctor.find({ specialities: { $regex: speciality, $options: "i" } })
      .exec()
      .then((doctor) => {
        console.log("finded doctor: " + doctor);
        res.render("doctors/bestDoctors.ejs", { allDoctors: doctor.sort((a, b) => a.successRate - b.successRate).reverse() });
      });
})

module.exports = router;
