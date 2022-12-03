var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to login to do that!");
  res.redirect("/login");
};

middlewareObj.isAdminLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.username == "admin") {
      return next();
    } else {
      req.flash("error", "You need to be an Admin to do that!");
      res.redirect("/dashboard");
    }
  }
  req.flash("error", "You need to login to do that!");
  res.redirect("/login");
};

module.exports = middlewareObj;
