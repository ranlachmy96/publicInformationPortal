# Public Information Portal

# Back End

## Overview

This repository contains the source code for [publicInformationPortal], a project with the goal for showing users information about a varity 
of emergancy issues, as a guest user the user can mainly view information and as an admin user the user can input,update and deletd Alerts which will be shown to the guest users 
overall the goal of the system is to enrich the users knowladged during emrgancy times.
The APIs provided  for managing organizations, instructions, users, campaigns. The project is built using Node.js, Express.js, MongoDB, and Mongoose.

## Features

- **CRUD Operations**: Provides Create, Read, Update, and Delete operations for managing data.
- **Error Handling**: Handles various error scenarios, providing meaningful error messages for debugging.
- **Authentication and Authorization**: Implements user authentication and authorization using JWT tokens.
- **Logging**: Logs requests and responses for debugging and monitoring purposes.
- **Database Integration**: Integrates with MongoDB for data storage.
- **CORS Support**: Supports cross-origin resource sharing.

## Installation

1. Clone the repository:
   ```
   git clone <repository_url>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following environment variables in the `.env` file:
     ```
     PORT=3000
     DB_HOST=<mongodb_host>
     DB_USER=<mongodb_username>
     DB_PASS=<mongodb_password>
     DB_NAME=<mongodb_database_name>
     JWT_KEY=<jwt_secret_key>
     ```

4. Start the server:
   ```
   npm start
   ```

## Usage

### Endpoints Api

- Alerts: [Postman Documentation](https://documenter.getpostman.com/view/32171508/2sA3BgAF1a)
- Organizations: [Postman Documentation](https://documenter.getpostman.com/view/31980925/2sA35G4hS5)
- Instructions: [Postman Documentation](https://documenter.getpostman.com/view/31980925/2sA35G4hMg)
- Users: [Postman Documentation](https://documenter.getpostman.com/view/31980925/2sA3BgAF1e)

### Authentication

- To use APIs that require authentication, obtain a JWT token by sending a POST request to the `/LogIn` endpoint with valid user credentials.
- Include the token in the `Authorization` header for authenticated requests.

### Error Handling

- The project handles various error scenarios, including 400 (Bad Request), 404 (Not Found), and 500 (Internal Server Error).
- Error responses include meaningful error messages to help identify the issue.


# Front End

This repository contains the frontend codebase for the Public Information Portal application. The Public Information Portal is a web application designed to provide users with access to emergency alerts, news articles, and an interactive chatbot for emergency-related inquiries.

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Folder Structure](#folder-structure)
6. [Usage](#usage)
7. [API Integration](#api-integration)
8. [Contributing](#contributing)
9. [License](#license)

## Description

The frontend of the Public Information Portal is built using React.js, a popular JavaScript library for building user interfaces. It leverages various libraries and components to create a responsive and interactive user experience.

## Features

- **Alerts Dashboard**: View a list of active emergency alerts with details.
- **Chatbot Interface**: Interact with an AI-powered chatbot to get emergency-related information.
- **News Articles**: Access a curated list of news articles from reputable sources.
- **Organizations**: access a list about emergancy organizations and follow links to each corsponding site.
- **Safety Instruction**: A list of natural and man made disasters and how to handle them.
- **Resources Page**: A resources page using a donations campaigns Api to show how much is donated to each category.  
- **User-friendly Design**: Intuitive user interface with smooth navigation and responsive layout.

## Technologies Used

- React.js
- Material-UI
- Styled Components
- Axios

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/public-information-portal.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd public-information-portal/frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server using vite:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your web browser to access the application.

6. link to working front https://public-information-marag.netlify.app/dashboard

## Folder Structure

The frontend codebase follows a modular structure for better organization and maintainability:

```
public-information-portal/
│
└── frontend/
    ├── public/                  # Static assets
    ├── src/                     # Source files
    │   ├── components/          # Reusable components
    │   ├── pages/               # Individual pages/components
    │   ├── services/            # API integration services
    │   ├── styles/              # CSS styles
    │   └── App.js               # Main application component
    ├── README.md                # Frontend README file
    └── package.json             # NPM package configuration
```

## Usage

- The application provides a user-friendly interface to access emergency alerts, news articles, and interact with the chatbot.
- Users can navigate through different sections using the navigation bar or buttons provided on the UI.

## API Integration

The frontend integrates with the backend API to fetch data for emergency alerts, news articles, and chatbot interactions. Axios is used for making HTTP requests to the backend server.

## Contributing

Contributions to the Public Information Portal project are welcome! To contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project belongs to Ran Lachmy & Eido Peretz.
