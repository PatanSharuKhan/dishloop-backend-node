# Run in Docker
Clone the repo `git clone https://github.com/PatanSharuKhan/dishloop-backend-node.git`

cd `dishloop-backend-node`

To build the docker image
`docker build --tag dishloop-backend-node .`

To run the container
`docker run -e RESTAURANT_DATABASE_URL --publish 3001:3000 dishloop-backend-node`

Test the api's at `http://localhost:3001`

Note: Set the RESTAURANT_BACKEND_URL='mongodb://.......' before running the swagger or production code.

# Run Swagger
Make sure the application is running at `http://localhost:3000`

Open `http://localhost:3000/api-docs`

# Local Development
Clone the repo `git clone https://github.com/PatanSharuKhan/dishloop-backend-node.git`

cd `dishloop-backend-node`

Run `yarn install`

Run `yarn dev`
(set environment variable - RESTAURANT_DATABASE_URL)
