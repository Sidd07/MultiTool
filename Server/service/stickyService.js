const stickyModel = require('../model/stickyModel');

let stickyService = {};

stickyService.getDatafromModel=()=> {
        return stickyModel.getdata().then(
            (data)=>{
                if(data){
                    return data                  
                }else 
                { let err = new Error("No data exists!");
                err.status = 500;
                throw err;
            }   
         })
}
module.exports = stickyService