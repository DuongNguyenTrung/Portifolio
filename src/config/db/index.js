import mongoose from 'mongoose'
import dotenv from  'dotenv'
dotenv.config()
async function connect(){
    try {
        await mongoose.connect(process.env.DB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            });
            console.log('connect succesfully !')
        
    } catch (error) {
        console.log(error);
    }
}

export default connect;
