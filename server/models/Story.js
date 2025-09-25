const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
    address: String
  },
  climateImpact: {
    type: String,
    enum: ['flood', 'drought', 'heatwave', 'storm', 'wildfire', 'other'],
    required: true
  },
  images: [String],
  aiSummary: String,
  submittedBy: String,
  aiGenerated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

storySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Story', storySchema);