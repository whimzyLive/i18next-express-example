var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var middleware = require("i18next-express-middleware");
var i18next = require("i18next");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var enTranslations = require("./assets/en.json");
var zhTranslations = require("./assets/zh.json");

var app = express();

i18next.use(middleware.LanguageDetector).init({
  detection: {
    order: ["path", "querystring"],
    lookupPath: "lng",
    lookupFromPathIndex: 1
  },
  preload: ["en", "zh"],
  fallbackLng: "en",
  debug: true,
  resources: {
    en: enTranslations,
    zh: zhTranslations
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  middleware.handle(i18next, {
    ignoreRoutes: [],
    removeLngFromUrl: false
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
