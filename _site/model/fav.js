const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favSchema = new Schema({
   favs: {
       type: Array,
       required: true
   },
   id: {
       type: Number,
       required: true
   }
   
});


module.exports = mongoose.model('Favourite', favSchema)