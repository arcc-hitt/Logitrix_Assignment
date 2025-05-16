import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

export default (app: Express) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: { title: 'Task API', version: '1.0.0' }
    },
    apis: ['./src/routes/*.ts']
  };
  const spec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
};
