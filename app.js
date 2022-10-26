// ======= defining packages ===========//

import router, { route } from "./routes/index";

const { default: mongoose } = require("mongoose");

const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
flash = require("connect-flash");

// ============= Defining Custom Models

const User = require("./models/user");

//=======  Basic express app setup =========//

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "/public"));

app.use(flash());

mongoose.connect("mongodb://localhost/aighteam1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
});

// ========== Defining Routes ============ //

const indexRoutes = require("./routes/index");
const DashboardRoutes = require("./routes/dashboard");
const DoctorRoutes = require("./routes/doctor");

//===========  Authentication  =========== //

app.use(
  require("express-session")({
    secret: "aighteam secret code",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// ========== Routes ================ //

app.use("/", indexRoutes);
app.use("/dashboard", DashboardRoutes);
app.use("/doctor", DoctorRoutes);

// for testing

app.get("/doctor/all", function (req, res) {
  Doctor.find({}, function (err, allDoctors) {
    if (err) {
      console.log("All doctors retrieval error");
      console.log(err);
    } else {
      res.render("doctors/allDoctors.ejs", { allDoctors: allDoctors });
    }
  });
});

// testing doctor

app.get("/doctor/doctors/:id", function(req, res){
  Doctor.findById(req.params.id).exec(function(err, doctor){
    if(err){
      req.flash(err);
      console.log(err);
    }else{
      res.render("doctors/doctor", {doctor: doctor});
    }
  })
})

// testing user

app.get('/users/3', function(req, res) {
  res.json({ user: 'user3' });

  Real code from my application below
  const { id } = req.params;
     model.User.findOne({
         where: { id: Number(id) }
     }).then(user=>{
         res.status(200).json({ user });
     }).catch(error=>{
         console.log(error)
         req.status(500).send(error)
     })
});

// ============= End Setup =============//

app.listen(3000, function () {
  console.log("hahahahaha you are good to goo..... :DDDDDDD");
});

export default app;
