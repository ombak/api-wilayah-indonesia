'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var csv = require('fast-csv');


/**
 * @swagger
 *
 * /provinsi:
 *  get:
 *      description: Returns data provinsi
 *      responses:
 *          200:
 *              description: Get all data provinsi
 */
router.get('/', function(req, res, next) {
    var _arrObj = [];

    // get data provinsi from csv file
    fs.createReadStream(path.resolve(__basedir, 'data', 'tbl_provinsi.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.log(error))
        .on('data', async (row) => {
            // push the row to array
            _arrObj.push(row);
        })
        .on('end', (rowCount) => {
            res.status(200).json({
                "status": "success",
                "message": "Get all data provinsi",
                "data": _arrObj
            });
        });
});

module.exports = router;
