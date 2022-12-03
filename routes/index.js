const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// ========== index ========== //

router.get("/", function (req, res) {
  res.render("landing");
});

// ========== signup Form ===========

router.get("/register", function (req, res) {
  res.render("register", { page: "register" });
});

//  sign up Logic ==========

router.post("/register", function (req, res) {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "welcome to Camps " + user.username);
      res.redirect("/dashboard");
    });
  });
});

//  Login Form ==========

router.get("/login", function (req, res) {
  res.render("login", { page: "login" });
});

//  Login logic =============

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",

    failureFlash: true,
  }),
  function (req, res) {}
);

// Edit User Form =============

router.get("/user/:id/edit", (req, res) => {
  res.render("editUser", { userId: req.params.id });
});

// Edit User ===============

router.post("/user/:id/edit", function (req, res, next) {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { username: req.body.username, email: req.body.email },
    function (err, user) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/");
      } else {
        req.flash("success", "you have successfully logged out");
        res.render("landing.ejs");
      }
    }
  );
});

// Logout ===================

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "you have successfully logged out");
    res.redirect("/");
  });
});

module.exports = router;
