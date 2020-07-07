import express from 'express';
// Bootstrap express
import expressConfig from './config/express';

const port = process.env.PORT || 3023;

const app = express();

expressConfig(app);

const server = app.listen(port);

logger.info(`Applicaion API started on port ${port}`);

export { app, server };
