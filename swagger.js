const swaggerJSDoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DishLoop Backend Node APIs",
      version: "1.0.0",
      description: "API documentation for DishLoop backend.",
    },
  },
  apis: ["./routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec
