const swaggerAutogen = require('swagger-autogen')();
// nasproject-cse341.onrender.com
const doc = {
    info: {
      title: 'My API',
      description: 'Contacts API for L04 assignment',
    },
    host: 'nasproject-cse341.onrender.com',
    schemes: ['https'],
    components: {
      securitySchemes: {
        googleOAuth2: {
          type: 'oauth2',
          description: "This API uses OAUTH 2 with the authorization code.",
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
              tokenUrl: 'https://oauth2.googleapis.com/token',
              scopes: {
                openid: 'openid',
                profile: 'profile',
                email: 'email'
              },
            },
          },
        },
      },
    },
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);