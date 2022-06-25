import mongoose, { Schema } from "mongoose";

const ProfileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    bio: {
      type: String
    },
    company: {
      type: String
    },
    website: {
      type: String
    },
    location: {
      type: String
    },
    status: {
      type: String
    },
    skills: {
      type: [String]
    },
    social: {
      facebook: {
        type: String
      },
      instagram: {
        type: String
      },
      twitter: {
        type: String
      },
      tiktok: {
        type: String
      },
      youtube: {
        type: String
      },
      linkedin: {
        type: String
      },
    }
  },
  { timestamps: true }
);

export default mongoose.model('Profile', ProfileSchema)