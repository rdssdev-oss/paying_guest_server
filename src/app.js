import express from 'express';
import cors from 'cors';
import routes from './routes/index.js'
import swaggerDocs from './docs/swagger.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/v1', routes);


// Swagger Docs
swaggerDocs(app);

// Error handler
app.use(errorHandler);

export default app;
