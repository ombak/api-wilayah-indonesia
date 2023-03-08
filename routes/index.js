'use strict';

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        "status": "success",
        "message": "Selamat datang di RESTful APIs data wilayah di Indonesia",
        "license": "https://mit-license.org/",
        "author": "ombak"
    });
});

module.exports = router;
