const mongoose = require('mongoose');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/climatelens');
    console.log('✅ Database connection successful');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Database check completed');
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  }
};

checkDatabase();