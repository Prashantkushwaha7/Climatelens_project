const mongoose = require('mongoose');
require('dotenv').config();

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/climatelens');
    console.log('✅ MongoDB connected successfully');

    // Create collections if they don't exist
    const collections = ['users', 'stories', 'notifications', 'otps'];
    
    for (const collectionName of collections) {
      const collection = mongoose.connection.db.collection(collectionName);
      await collection.createIndex({ createdAt: 1 });
      console.log(`✅ Collection '${collectionName}' initialized`);
    }

    console.log('🎉 Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

initializeDatabase();