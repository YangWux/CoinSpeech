const mongoose =  require ('mongoose');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    reuired: true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  coins:{
    type:Number,
    default:0
  }

});
module.exports = User = mongoose.model('user',UserSchema);
