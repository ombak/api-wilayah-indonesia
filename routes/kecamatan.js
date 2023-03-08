'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var csv = require('fast-csv');

/**
 * @swagger
 * components:
 *   schemas:
 *     Kecamatan:
 *       type: object
 *       required:
 *         - id
 *         - kabkot_id
 *         - kecamatan
 *       properties:
 *         id:
 *           type: string
 *           description: The auto generate id of kecamatan
 *         kabkot_id:
 *           type: string
 *           description: Kabupaten Kota id
 *         kecamatan:
 *           type: string
 *           description: Name of kecamatan
 *       example:
 *         id: 1
 *         kabkot_id: 1
 *         kecamatan: Arongan Lambalek
 */

/**
 * @swagger
 *
 * tags:
 *   name: Kecamatan
 *   description: Nama Kecamatan di Indonesia
 * /kecamatan/{kabupaten_kota_id}:
 *   get:
 *     summary: List all Kecamatan
 *     tags: [Kecamatan]
 *     parameters:
 *       - in: path
 *         name: kabupaten_kota_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Kabupaten Kota id
 *     responses:
 *       200:
 *         description: The list of Kecamatan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Kecamatan'
 *       400:
 *         description: The Provinsi was not found
 */
router.get('/:kabupaten_kota_id', function (req, res, next) {
    var _arrObj = [];
    var _id = req.params.kabupaten_kota_id;

    // get data kecamtan from csv file
    fs.createReadStream(path.resolve(__basedir, 'data', 'tbl_kecamatan.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', (row) => {
            // push the row to array
            if (row.kabkot_id == _id) {
                _arrObj.push(row);
            }
        })
        .on('end', (rowCount) => {
            res.status(200).json({
                "status": "success",
                "message": "Get all data provinsi",
                "data": _arrObj
            });
        })
});

module.exports = router;
