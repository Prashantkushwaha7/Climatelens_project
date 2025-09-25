const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateStorySummary = async (storyContent, climateImpact, location) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Create a brief, engaging summary (max 100 words) of this climate impact story:
    
    Location: ${location}
    Climate Impact: ${climateImpact}
    Story: ${storyContent}
    
    Focus on the human impact and make it compelling for readers.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return storyContent.substring(0, 100) + '...';
  }
};

const generateAIStory = async (location, weather, language = 'english') => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    let prompt;
    
    if (language === 'hindi') {
      prompt = `IMPORTANT: You must respond ONLY in Hindi language using Devanagari script. Do not use any English words or Roman script.

Write a climate story in Hindi about:
Location: ${location.city}, ${location.country}
Weather: ${weather.temperature}°C, ${weather.description}
Humidity: ${weather.humidity}%
Wind: ${weather.windSpeed} m/s

Requirements:
- Write 150-200 words in Hindi only
- Use only Devanagari script
- No English words allowed
- Make it educational about climate change
- Include local environmental context
- End with positive message about climate action

Start your response immediately with the Hindi story:`;
    } else if (language === 'nepali') {
      prompt = `IMPORTANT: You must respond ONLY in Nepali language using Devanagari script. Do not use any English words.

Write a climate story in Nepali about:
Location: ${location.city}, ${location.country}
Weather: ${weather.temperature}°C, ${weather.description}
Humidity: ${weather.humidity}%
Wind: ${weather.windSpeed} m/s

Requirements:
- Write 150-200 words in Nepali only
- Use only Devanagari script
- No English words allowed
- Make it educational about climate change

Start your response immediately with the Nepali story:`;
    } else {
      prompt = `Create an engaging, educational climate story (150-200 words) in English based on:
      
      Location: ${location.city}, ${location.country}
      Current Weather: ${weather.temperature}°C, ${weather.description}
      Humidity: ${weather.humidity}%
      Wind Speed: ${weather.windSpeed} m/s
      
      Write a story that:
      1. Connects the current weather to broader climate patterns
      2. Explains climate impacts in simple terms for general audience
      3. Includes local environmental context
      4. Ends with a positive message about climate action
      5. Uses storytelling to make climate science accessible
      
      Make it educational yet engaging, suitable for all ages.`;
    }

    console.log('AI Prompt for language:', language);
    console.log('Prompt preview:', prompt.substring(0, 200) + '...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const storyText = response.text();
    
    console.log('Generated story language:', language);
    console.log('Story preview:', storyText.substring(0, 100) + '...');
    
    return storyText;
  } catch (error) {
    console.error('Error generating AI story:', error);
    throw new Error('Failed to generate AI story');
  }
};

module.exports = { generateStorySummary, generateAIStory };