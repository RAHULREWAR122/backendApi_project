import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role : {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, 
    },

  }, { timestamps: true });
  
export const User = mongoose.model('UserRegisterSchema', userSchema);
