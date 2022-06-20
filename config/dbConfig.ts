import mongoose from 'mongoose';

export default async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log(`MongoDB Connected!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
