const stickyModel = require('../model/stickyModel');

let stickyService = {};

stickyService.getDatafromModel=(date)=> {
    console.log('date im',date)
        return stickyModel.getdata(date).then(
            (data)=>{
                if(data){
                    return data                  
                }else 
                { 
                    return data
            }   
         })
}

stickyService.AddDataService=(obj)=> {
    console.log("add data of service")
    return stickyModel.updateData(obj).then(
        (data)=>{
            if(data){
                return data                  
            }else 
            { let err = new Error("Couldnt able to update");
            err.status = 500;
            throw err;
        }   
     })
}
module.exports = stickyService