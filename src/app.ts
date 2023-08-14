import express from 'express';
import { createServer } from 'http';
import { applyRoutes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

applyRoutes(app);

const server = createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
