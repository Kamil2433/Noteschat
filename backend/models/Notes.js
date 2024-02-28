const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
 

  title:{
    type:String,
    require:true
  },User:{
    type:Schema.Types.ObjectId,
    ref:'user'
    },
  description:{
    type:String,
    require:true,
  },
  groupId: {
    type: mongoose.Types.ObjectId,
    ref: 'Group'
  },
  date:{
    type:Date,
    default:Date.now
  }

})

module.exports=mongoose.model('Notes',NotesSchema);


