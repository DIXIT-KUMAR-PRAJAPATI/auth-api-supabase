const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "Authentication API using Express and Supabase",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
},
  },
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;