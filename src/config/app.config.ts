import * as dotenv from 'dotenv';
dotenv.config();
import { errorHandler } from '../middleware/error.handler';
import express, { Express } from 'express';
import * as badyParser from 'body-parser';
import { router } from '../routes';
import './database.config';

export const PORT = process.env.PORT || 3000;

const app: Express = express();
app.use(badyParser.json());
app.use('/api/v1', router);
app.use(errorHandler);
app.use(express.json());

export default app;