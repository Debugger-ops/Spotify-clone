# Spotify Clone

A lightweight web-based music player application built using vanilla HTML, CSS, and JavaScript that mimics core Spotify functionality.

## Features

- Responsive design that works across desktop and mobile devices
- Music player controls (play, pause, skip, seek, volume)
- Dynamic playlist management
- Search functionality for songs and artists
- Custom audio visualization
- Local storage to save user preferences and playlists

## Project Structure

```
spotify-clone/
├── Spotify.html
├── Spotify.css
├── Spotify.js
│
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spotify-clone.git
```

2. Navigate to project directory:
```bash
cd spotify-clone
```

3. Open `index.html` in your preferred browser, or use a local server:
```bash
python -m http.server 8000
```

## Implementation Details

### HTML Structure
- `index.html`: Main application layout
- Semantic HTML5 elements for better accessibility
- Responsive meta tags for mobile optimization

### CSS Features
- CSS Grid and Flexbox for layouts
- CSS Variables for consistent theming
- Media queries for responsive design
- CSS animations for smooth transitions
- Custom scrollbar styling
  
**###Javascript Feature**
1- Audio Player Controls
Feature: Play, pause, skip, shuffle, repeat, volume control.
How to Implement:
Use the HTML5 <audio> element for basic audio controls.
Use JavaScript to handle events like play(), pause(), skip(), and adjust volume.
For a more advanced player, integrate the Spotify Web Playback SDK for handling real Spotify streams.

2-Track Details (Album Art, Song Info, etc.)
Feature: Show the song title, artist name, album art, and other relevant metadata.
How to Implement:
Fetch song details from the Spotify API or your backend and display them in the UI.
Dynamically update the player with album art, song titles, and artist names.

3-Now Playing Bar
Feature: Display the currently playing song with options for pause, skip, and other controls.
How to Implement:
Use JavaScript to update the UI with the current song's metadata (song title, artist name, etc.).
Create a sticky player bar that updates as the song progresses, with options to control playback.



## Core Functionality

### Music Player
- Play/Pause toggle
- Next/Previous track controls
- Progress bar with seek functionality
- Volume control with mute toggle
- Shuffle and repeat modes
- Current time and duration display


### User Interface
- Responsive sidebar navigation
- Search functionality with filters
- Dynamic content loading
- Custom audio visualizer

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

1. Audio files must be hosted locally
2. No user authentication system
3. Limited to browser's local storage capacity
4. No real-time data synchronization

## Future Enhancements which will be done

1. Integration with music APIs
2. User authentication system
3. Social sharing features
4. Custom theme creation
5. Offline mode support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Spotify's design system for inspiration
- Open source audio visualization libraries
- Icon providers and font services

## Contact

For questions and support, please open an issue in the repository.
