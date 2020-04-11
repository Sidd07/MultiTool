const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const url = "mongodb://localhost:27017/StickyDB";


const schema = Schema({
    selectedDate: String,
    content:{
        headingText: String,
        bodyText: String
    }
    
}, { collection: "StickyNoteDB", timestamps: false })


let StickyNote = {};
  
StickyNote.getProductCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('StickyNoteDB', schema) 
    }).catch((error) => {
        console.log(error);
        
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })  
}


module.exports = StickyNote;
