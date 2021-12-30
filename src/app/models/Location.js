import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Location = new Schema({
  name: {type:String,minlength:2},
  description: String,
  img: Array
},{timestamps:true});

export default mongoose.model('location',Location);