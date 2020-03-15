import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';

export default ({ app }: { app: express.Application}) => {
  
  app.get('/status', (_req: Request, res: Response) => {
    res.status(200).end();
  });
  app.head('/status', (_req: Request, res: Response) => {
    res.status(200).end();
  })

  app.use(cors());
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());

  app.use((_req: Request, _res: Response, next: NextFunction) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // error handlers
  app.use((err, _req: Request, res: Response, next: NextFunction) => {
    if(err.name === 'CustomErrorName') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);
    res.json({ errors: { message: err.message }});
  });

}
