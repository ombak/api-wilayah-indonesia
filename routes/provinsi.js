"use strict";

var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var csv = require("fast-csv");

/**
 * @swagger
 * components:
 *   schemas:
 *     Provinsi:
 *       type: object
 *       required:
 *          - kode
 *          - provinsi
 *          - singkatan
 *       properties:
 *         kode:
 *           type: string
 *           description: The auto generate id of the provinsi
 *         provinsi:
 *           type: string
 *           description: The name of province
 *         singkatan:
 *           type: string
 *           description: The capital of province
 *       example:
 *         kode: 11 
 *         provinsi: ACEH
 *         singkatan: 
 */

/**
 * @swagger
 *
 * tags:
 *   name: Provinsi
 *   description: Nama provinsi di Indonesia
 * /provinsi:
 *   get:
 *     summary: List all the provinsi
 *     tags: [Provinsi]
 *     responses:
 *       200:
 *         description: The list of the provinsi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provinsi'
 */
router.get("/", function (req, res, next) {
  console.log("server: " + process.env.SERVER);
  
  var _arrObj = [];

  // get data provinsi from csv file
  fs.createReadStream(path.resolve(__basedir, "data", "provinsi.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.log(error))
    .on("data", (row) => {
      // push the row to array
      _arrObj.push(row);
    })
    .on("end", (rowCount) => {
      //console.log("render");
      res.status(200).json({
        status: "success",
        message: "Get all data provinsi",
        data: _arrObj,
      });
    });
});

module.exports = router;
