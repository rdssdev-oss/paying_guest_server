import swaggerUi from 'swagger-ui-express';

const swaggerDocs = (app) => {
  const swaggerSpec = {
    openapi: '3.0.0',
    info: {
      title: 'Express Backend API',
      version: '1.0.0',
      description: 'API documentation for Express Backend boilerplate',
    },
   servers: [
      {
        // url: 'http://localhost:5000',
      },
    ],
    
  // apis: ['.api/v1/auth/routes/*.js']
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;

 
   // where the swagger comments are