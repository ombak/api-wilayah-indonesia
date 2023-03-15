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
 *          - id
 *          - provinsi
 *          - ibukota,
 *          - p_bsni
 *       properties:
 *         id:
 *           type: string
 *           description: The auto generate id of the provinsi
 *         provinsi:
 *           type: string
 *           description: The name of province
 *         ibukota:
 *           type: string
 *           description: The capital of province
 *         p_bsni:
 *           type: string
 *           description: The National code
 *       example:
 *         id: 1
 *         provinsi: Aceh
 *         ibukota: Banda Aceh
 *         p_bsni: ID-AC
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
  var _arrObj = [];

  // get data provinsi from csv file
  fs.createReadStream(path.resolve(__basedir, "data", "tbl_provinsi.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.log(error))
    .on("data", (row) => {
      // push the row to array
      _arrObj.push(row);
    })
    .on("end", (rowCount) => {
      console.log("render");
      res.status(200).json({
        status: "success",
        message: "Get all data provinsi",
        data: _arrObj,
      });
    });
});

module.exports = router;
