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
 *    KabupatenKota:
 *      type: object
 *      required:
 *        - id
 *        - provinsi_id
 *        - kabupaten_kota
 *        - ibukota
 *        - k_bsni
 *      properties:
 *        id:
 *          type: string
 *          description: The auto generate di of the kabupaten kota
 *        provinsi_id:
 *          type: string
 *          description: The provinsi id from table provinsi
 *        kabupaten_kota:
 *          type: string
 *          description: The name of kabupaten kota
 *        ibukota:
 *          type: string
 *          description: The capital of kabupaten kota
 *        k_bsni:
 *          type: string
 *          description: The national code
 *      example:
 *        id: 1
 *        provinsi_id: 1
 *        kabupaten_kota: Kabupaten Aceh Barat
 *        ibukota: Meulaboh
 *        k_bsni: MBO
 */

/**
 * @swagger
 *
 * tags:
 *   name: Kabupaten Kota
 *   description: Nama Kabupaten Kota di Indonesia
 * /kabupaten-kota/{provinsi_id}:
 *   get:
 *     summary: List kabupaten kota by provinsi id
 *     tags: [Kabupaten Kota]
 *     parameters:
 *       - in: path
 *         name: provinsi_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Provinsi ID
 *     responses:
 *       200:
 *         description: The kabupaten kota response by provinsi id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KabupatenKota'
 *       400:
 *         description: The Kabupaten Kota was not found
 *
 */
router.get('/:provinsi_id', function (req, res, next) {
    var _arrObj = [];
    var _id = req.params.provinsi_id;

    // get data kabupaten/kota by provinsi id
    fs.createReadStream(path.resolve(__basedir, 'data', 'tbl_kabupaten_kota.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', (row) => {
            if (row.provinsi_id == _id) {
                _arrObj.push(row);
            }
        })
        .on('end', (rowCount) => {
            res.status(200).json({
                "status": "success",
                "message": "Get data Kabupaten Kota by provinsi id",
                "data": _arrObj
            });
        });

});

module.exports = router;
