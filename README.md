# Social Network API

This is a RESTful API for a social network application. It allows users to create accounts, share their thoughts, react to thoughts, and manage their friends list. The API is built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- CRUD operations for users and thoughts
- Adding and removing friends
- Reacting to thoughts
- Pagination and sorting for retrieving thoughts

## Getting Started

### Prerequisites

To run the Social Network API locally, you need to have the following software installed on your system:

- Node.js (v14 or above)
- MongoDB (v4.0 or above)

### Installation

1. Clone the repository:

   git clone https://github.com/mmoghal/Social-Network-API.git


2. Install the dependencies:


   cd social-network-api
   npm install
 

3. Configure the environment variables:
   - Create a `.env` file in the root directory.
   - Set the following environment variables in the `.env` file:

     MONGODB_URI=<enter-your-mongodb-connection-string>
     JWT_SECRET=<enter-your-jwt-secret-key>


## Usage

To start the server, run the following command:


npm start


The API server will start running on `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get a user by ID
- `PUT /api/users/:userId` - Update a user by ID
- `DELETE /api/users/:userId` - Delete a user by ID
- `POST /api/thoughts` - Create a new thought
- `GET /api/thoughts` - Get all thoughts
- `GET /api/thoughts/:thoughtId` - Get a thought by ID
- `PUT /api/thoughts/:thoughtId` - Update a thought by ID
- `DELETE /api/thoughts/:thoughtId` - Delete a thought by ID
- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Contributing

Contributions to the Social Network API are welcome! If you find any issues or want to add new features, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.