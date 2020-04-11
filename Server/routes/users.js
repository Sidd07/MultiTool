var express = require('express');
var router = express.Router();
var stickyService = require('../service/stickyService')



router.post('/', function(req, res, next) {
   console.log('users roiter data',req.body);
   
   stickyService.getDatafromModel(req.body).then(Data=>{
     res.json(Data);
    }).catch(err => next(err)) 
    });



router.post('/updateData', function(req, res, next) {
       return stickyService.AddDataService(req.body).then(data=>{
        if (data) {
            res.status(200);
            res.json({ message: "Deletion of Cart in database" })
        }
 }).catch(err => next(err)) 
 });


module.exports = router;
