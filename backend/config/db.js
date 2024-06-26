import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ITCG:UrbanFarm@cluster0.dcw2tog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};