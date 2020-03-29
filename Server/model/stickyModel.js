const StickyNote = require('../bin/connectionDB');
let StickyCollection = {};

StickyCollection.getdata=() => {
    return StickyNote.getProductCollection().then(model => {
        return model.findOne({}).then(data => {
            if (data != null) {
             return data  
            }
            else {
               return null 
            }
        })

    })
}

 module.exports = StickyCollection