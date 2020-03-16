var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  debugger;
  var lng = req.language;
  res.render("index", { title: "Express", lng: lng });
});

module.exports = router;
