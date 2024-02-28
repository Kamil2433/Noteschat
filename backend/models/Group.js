const mongoose = require('mongoose')
const { Schema } = mongoose;

const Groupschema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
      },
      color: {
        type: String,
        required: true
      },
      notes: [
        {
          description: String,
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
      
      User:{
        type:Schema.Types.ObjectId,
        ref:'user'
        }

})

module.exports=mongoose.model('Group',Groupschema);