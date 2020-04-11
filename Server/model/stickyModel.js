const StickyDBConnection = require('../bin/connectionDB');
let StickyCollection = {};

StickyCollection.getdata=(passingData) => {
    return StickyDBConnection.getProductCollection().then(model => {
        console.log('im gate data')
        return model.findOne({'selectedDate':passingData.date}).then(data => {
            if (data != null) {
             return data  
            }
            else {
                if(!data){
                    return model.create({
                        'selectedDate':passingData.date,
                        'content':{
                            'headingText': 'Sticky Notes',
                            'bodyText': 'Edit here'
                        }
                    }).then(data =>
                        {
                        return data
                    })
                }
            }
        })  

    })
    
}


StickyCollection.updateData=(passingData) => {
    console.log('in data model',passingData)
    return StickyDBConnection.getProductCollection().then(model => {

        return model.findOneAndUpdate({'selectedDate':passingData.date},{
            'content':{
               'headingText': passingData.headingText,
               'bodyText': passingData.bodyText
            }
        }).then(data => {         
            if (data) {              
             return 'value updated'  
            }
            else {
            return null 
            }
        })

    })
}

 module.exports = StickyCollection