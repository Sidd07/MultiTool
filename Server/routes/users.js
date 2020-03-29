var express = require('express');
var router = express.Router();
var stickyService = require('../service/stickyService')

/* GET users listing. */
router.get('/', function(req, res, next) {
   stickyService.getDatafromModel().then(Data=>{
    res.json(Data);
}).catch(err => next(err)) 
});


module.exports = router;
