"use strict";

require("dotenv").config();

<<<<<<< HEAD
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var cors = require('cors');
=======
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var cors = require("cors");
>>>>>>> 71e54bdf1e3a779294dee1b03491dcb9b9e97860

// Module Routes
var indexRouter = require("./routes/index");
var provinsiRouter = require("./routes/provinsi");
var kabupatenKotaRouter = require("./routes/kabupaten_kota.js");
var kecamatanRouter = require("./routes/kecamatan.js");
var kelurahanRouter = require("./routes/kelurahan.js");

var app = express();

// set global variable
global.__basedir = __dirname;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public')));
// use cors
//app.use(cors());

=======
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
>>>>>>> 71e54bdf1e3a779294dee1b03491dcb9b9e97860

// swagger settings
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Data Daerah Indonesia",
      version: "0.1.0",
      description:
        "RESTful APIs untuk Provinsi, Kabupaten/Kota, Kecamatan, Kelurahan dan Kode Pos di Indonesia",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "sw.saputra",
        url: "www.sukmasaputra.com",
        email: "coklatpanas83@gmail.com",
      },
    },
    servers: [
      {
        url: process.env.SERVER,
      },
    ],
  },
  apis: [path.join(__dirname, "/routes/*.js")],
};

const specs = swaggerJsdoc(options);

// Swagger registration
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  })
);

// registration all routes
app.use("/", indexRouter);
app.use("/provinsi", provinsiRouter);
app.use("/kabupaten-kota", kabupatenKotaRouter);
app.use("/kecamatan", kecamatanRouter);
app.use("/kelurahan", kelurahanRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
