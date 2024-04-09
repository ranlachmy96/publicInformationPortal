# Public Information Portal

# Back End

## Overview

This repository contains the source code for [publicInformationPortal], a project with the goal for showing users information about a varity 
of emergancy issues, as a guest user the user can mainly view information and as an admin user the user can input,update and deletd Alerts which will be shown to the guest users 
overall the goal of the system is to enrich the users knowladged during emrgancy times.
The APIs provided  for managing [, organizations, instructions, users, campaigns]. The project is built using Node.js, Express.js, MongoDB, and Mongoose.

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

## Contributing

Contributions are welcome! Please follow the [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

---
