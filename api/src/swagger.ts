import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dynadok API',
      version: '1.0.0',
      description: 'Documentação da API Dynadok',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
      },
    ],
  },
  apis: ['./src/interfaces/http/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };