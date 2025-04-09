Clone the repo `git clone https://github.com/PatanSharuKhan/dishloop-backend-node.git`

cd `dishloop-backend-node`

To build the docker image
`docker build --tag dishloop-backend-node .`

To run the container
`docker run --publish 3001:3000 dishloop-backend-node`

Test the api's at `http://localhost:3001`
