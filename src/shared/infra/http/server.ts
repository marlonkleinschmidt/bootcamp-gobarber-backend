// --------------------------------------------------------------------------------
import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';
import '@shared/infra/typeorm'; // database
import '@shared/container'; // injeção de dependencia

// --------------------------------------------------------------------------------
const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);


app.use(errors());

// --------------------------------------------------------------------------------
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

// --------------------------------------------------------------------------------
app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Servidor ligado!' });
});

// --------------------------------------------------------------------------------
app.listen(3333, () => {
  console.log('Servidor ligado!!!');
});
