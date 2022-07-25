import express, { Application } from 'express';
import 'dotenv/config';
import routes from './routes';
import { AppDataSource } from './data-source';
const app: Application = express();

console.log('Starting database connection...');

AppDataSource.initialize()
  .then(async () => {
    console.log('Database started');

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(routes);
  })
  .catch((error) => console.log(`Failed to connect to Database erro: ${error}`));

export default app;
