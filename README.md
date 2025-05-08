# YouTube Transcript Downloader

A simple web application that allows users to download the transcript for any YouTube video.

## Features

- Clean and intuitive user interface
- Paste any YouTube video URL and get the transcript
- Download transcript as a text file
- Responsive design that works on desktop and mobile

## Project Structure

```
.
├── index.html               # Main HTML file
├── src/
│   ├── components/          # JavaScript components
│   │   └── app.js           # Main application logic
│   ├── styles/              # CSS files
│   │   └── style.css        # Main stylesheet
│   └── api/                 # Server-side API code (requires Node.js)
│       └── youtube-api.js   # YouTube API integration
└── public/                  # Public assets (if any)
```

## Quick Start

### Client-Side Only (Demo Mode)

1. Simply open the `index.html` file in your browser
2. The application will run in demo mode with mock data

### Full Implementation (with Backend)

For a complete implementation with actual YouTube transcript fetching:

1. Install Node.js and npm
2. Install required packages:
   ```
   npm install youtube-transcript express
   ```
3. Uncomment the code in `src/api/youtube-api.js`
4. Update the fetch function in `src/components/app.js` to call your API endpoint
5. Start the server:
   ```
   node src/api/youtube-api.js
   ```
6. Open `index.html` in your browser

## How It Works

1. The user inputs a YouTube video URL
2. The application extracts the video ID from the URL
3. The video ID is sent to the backend API (or mock data is used in demo mode)
4. The API fetches the transcript from YouTube
5. The transcript is displayed to the user
6. The user can download the transcript as a text file

## API Implementation Details

To implement the actual YouTube transcript fetching:

1. Use the `youtube-transcript` npm package
2. Set up an Express server to handle API requests
3. Create an endpoint to fetch and format transcripts

The commented code in `src/api/youtube-api.js` provides a template for this implementation.

## Dependencies

- [youtube-transcript](https://www.npmjs.com/package/youtube-transcript) (for backend)
- [Express](https://expressjs.com/) (for API server)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT 