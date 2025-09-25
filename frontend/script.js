document.addEventListener('DOMContentLoaded', function() {
    const createStoryBtn = document.getElementById('createStoryBtn');
    const modal = document.getElementById('storyModal');
    const closeBtn = document.querySelector('.close');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const storyContent = document.getElementById('storyContent');
    const storyText = document.getElementById('storyText');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const saveBtn = document.getElementById('saveBtn');
    const languageSelect = document.getElementById('languageSelect');

    let currentStory = '';
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;

    createStoryBtn.addEventListener('click', generateStory);
    closeBtn.addEventListener('click', closeModal);
    playBtn.addEventListener('click', playStory);
    pauseBtn.addEventListener('click', pauseStory);
    saveBtn.addEventListener('click', saveStory);

    async function generateStory() {
        modal.style.display = 'block';
        loadingSpinner.style.display = 'block';
        storyContent.style.display = 'none';

        try {
            // Step 1: Get location
            console.log('Getting location...');
            const location = await getCurrentLocation();
            console.log('Location:', location);

            // Step 2: Get weather data
            console.log('Fetching weather data...');
            const weather = await getWeatherData(location.lat, location.lon);
            console.log('Weather:', weather);

            // Step 3: Generate AI story
            console.log('Generating story...');
            const story = await generateAIStory(location, weather);
            console.log('Story generated:', story);

            // Display story
            currentStory = story;
            storyText.textContent = story;
            loadingSpinner.style.display = 'none';
            storyContent.style.display = 'block';

        } catch (error) {
            console.error('Error generating story:', error);
            storyText.textContent = 'Sorry, we couldn\'t generate a story right now. Please try again.';
            loadingSpinner.style.display = 'none';
            storyContent.style.display = 'block';
        }
    }

    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    }),
                    error => {
                        console.log('Geolocation failed, using IP location');
                        // Fallback to IP-based location
                        resolve({ lat: 27.7172, lon: 85.3240 }); // Default to Kathmandu
                    }
                );
            } else {
                resolve({ lat: 27.7172, lon: 85.3240 });
            }
        });
    }

    async function getWeatherData(lat, lon) {
        // Replace with your OpenWeather API key
        const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        return await response.json();
    }

    async function generateAIStory(location, weather) {
        // This would call your backend API which then calls Gemini
        const response = await fetch('/api/generate-story', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location, weather })
        });
        const data = await response.json();
        return data.story;
    }

    function playStory() {
        if (currentStory) {
            currentUtterance = new SpeechSynthesisUtterance(currentStory);
            currentUtterance.lang = languageSelect.value === 'hi' ? 'hi-IN' : 
                                   languageSelect.value === 'ne' ? 'ne-NP' : 'en-US';
            speechSynthesis.speak(currentUtterance);
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-block';
        }
    }

    function pauseStory() {
        speechSynthesis.cancel();
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }

    async function saveStory() {
        try {
            const response = await fetch('/api/save-story', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ story: currentStory })
            });
            if (response.ok) {
                alert('Story saved successfully!');
            }
        } catch (error) {
            console.error('Error saving story:', error);
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        speechSynthesis.cancel();
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
    }
});