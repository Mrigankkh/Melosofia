# Melosofia

Melosofia is a web application that explores the intersection of music and philosophy, allowing users to share and discover interpretations of song lyrics.

## Overview

Melosofia is a full-stack application built with:
- Frontend: React.js with Material-UI
- Backend: Express.js
- Database: Firebase/Firestore
- Authentication: Firebase Auth

## Features

- **Song Search**: Users can search for songs and view their details
- **Interpretations**: Users can read and share their interpretations of song lyrics
- **User Profiles**: Personal profiles to track user activity and contributions
- **Explore Page**: Discover latest interpretations from the community
- **Authentication**: Secure user authentication system

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── store/
└── backend/
    ├── api/
    │   ├── songs/
    │   ├── users/
    │   └── interpretations/
    └── db/
```

## API Endpoints

- `/songs/search` - Search for songs
- `/songs/:id/interpretations` - Get interpretations for a specific song
- `/user/info` - Get user information
- `/user/:username` - Get user profile
- `/interpretations` - Create new interpretation

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file with Firebase configuration
   - Add necessary API keys and credentials

4. Start the development server:
   ```bash
   npm start
   ```

## Authentication

The application uses Firebase Authentication. Protected routes require user authentication to access.


## License

© 2025 Melosofia. 
