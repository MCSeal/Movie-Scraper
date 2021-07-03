const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favSchema = new Schema({
   favs: {
       type: Array,
       required: true
   },
   shareCode: String
   
});


module.exports = mongoose.model('Favourite', favSchema)