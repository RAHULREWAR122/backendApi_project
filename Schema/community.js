import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    posts: [
      {
        title: {
          type: String,
          required: true,
        },
        desc: {
          type: String,
          required: true,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserRegisterSchema',
          required: true,
        },
        username : {
           type : String,
           required : true
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },

      },
    ],
  },
  { timestamps: true }
);

export const Community = mongoose.model('Community', communitySchema);
