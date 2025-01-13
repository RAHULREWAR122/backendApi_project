
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.DATABASE_URL);
export const db =  mongoose.connection;
db.on('error' , console.error.bind('error in connect db'));

db.once('open' ,()=>{
    console.log("mongoDB connected Successfully");
})
