// ======= defining packages ===========//

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

mongoose.connect("mongodb+srv://aditya:aditya@aighteamc1.bmxwix1.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
});

// ========== Defining Routes ============ //

const indexRoutes = require("./routes/index");
const DashboardRoutes = require("./routes/dashboard");
const DoctorRoutes = require("./routes/doctor");
const DiseaseRoutes = require("./routes/disease");

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
app.use("/doctor", DoctorRoutes)
app.use("/", DiseaseRoutes);

module.exports = app;
