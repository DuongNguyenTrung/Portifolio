import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const User = new Schema({
    username:{type:String , required:true,unique:true},
    password:{type:String,min:6},
    role:{ type:String, default:'user'}
},{timestamps:true})
export default mongoose.model('User',User)