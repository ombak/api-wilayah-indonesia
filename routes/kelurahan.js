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
 *     Kelurahan:
 *       type: object
 *       required:
 *         - id
 *         - kecamatan_id
 *         - kelurahan
 *         - kd_pos
 *       properties:
 *         id:
 *           type: string
 *           description: The auto generate id of kelurahan
 *         kecamatan_id:
 *           type: string
 *           description: Kecamatan id
 *         kelurahan:
 *           type: string
 *           description: The name of Kelurahan
 *         kd_pos:
 *           type: string
 *           description: Zipcode from kelurahan
 *       example:
 *         id: 1
 *         kecamatan_id: 1
 *         kelurahan: Alue Bagok
 *         kd_pos: 23652
 */

/**
 * @swagger
 * 
 * tags:
 *   name: Kelurahan
 *   description: Nama kelurahan di Indonesia
 * /kelurahan/{kecamatan_id}:
 *   get:
 *     summary: List all Kelurahan in Indonesia
 *     tags: [Kelurahan]
 *     parameters:
 *       - in: path
 *         name: kecamatan_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kecamatan ID
 *     responses:
 *       200:
 *         description: The list of Kelurahan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Kelurahan'
 *       400:
 *         description: The Kelurahan was not found
 */
router.get('/:kecamatan_id', function (req, res, next) {
    var _arrObj = [];
    var _id = req.params.kecamatan_id;

    // get data kecamtan from csv file
    fs.createReadStream(path.resolve(__basedir, 'data', 'tbl_kelurahan.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', (row) => {
            // push the row to array
            if (row.kecamatan_id == _id) {
                _arrObj.push(row);
            }
        })
        .on('end', (rowCount) => {
            res.status(200).json({
                "status": "success",
                "message": "Get all data kelurahan",
                "data": _arrObj
            });
        })
});

module.exports = router;
