import mongoose from 'mongoose';
import app from './app';
import { mongoURI, port } from './config';

export async function connectDb() {
  try {
    const connection = await mongoose.connect(mongoURI!);
    console.log(`Connected to database: ${connection.connection.host}`);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(`Failed to connect to database:`, error);
    process.exit(1);
  }
}

connectDb();
