const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
    },
    phone:{
      type:Number,
        required:true,
    },
    
  
    department: {
      type: String,
      required: true,
    },
    message:{
        type:String,
        required:true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
},
{timestamps: true})


const Contact = mongoose.model("contact", contactSchema);
module.exports =Contact;