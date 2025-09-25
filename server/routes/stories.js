const express = require('express');
const Story = require('../models/Story');
const { generateStorySummary, generateAIStory } = require('../services/aiService');
const router = express.Router();

// Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new story
router.post('/', async (req, res) => {
  try {
    const storyData = req.body;
    
    // Generate AI summary
    if (storyData.content && storyData.climateImpact) {
      storyData.aiSummary = await generateStorySummary(
        storyData.content,
        storyData.climateImpact,
        storyData.location?.address || 'Unknown location'
      );
    }
    
    const story = new Story(storyData);
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get stories by location (within radius)
router.get('/nearby/:lng/:lat/:radius', async (req, res) => {
  try {
    const { lng, lat, radius } = req.params;
    const stories = await Story.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(radius) * 1000 // Convert km to meters
        }
      }
    });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate AI story based on location and weather
router.post('/generate-ai', async (req, res) => {
  try {
    const { location, weather, language } = req.body;
    
    const story = await generateAIStory(location, weather, language);
    
    res.json({ story });
  } catch (error) {
    console.error('Error generating AI story:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;