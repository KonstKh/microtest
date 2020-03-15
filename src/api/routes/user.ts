import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import UserService from '../../services/user';
import { IUserDTO } from '../../interfaces/IUser';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Post user endpoint. Body: %o', req.body);
    try{
      const userService = Container.get(UserService);
      const {user} = await userService.CreateUser(req.body as IUserDTO);
      return res.status(200).send({user})
    } catch(e) {
      logger.error(`error: ${e}`);
      return next(e)
    }
  });

  route.get('/', async (_req: Request, res: Response) => {
    return res.status(200).end();
  });

  route.get('/random', async (req: Request, res: Response) => {
    const userServiceInstance = Container.get(UserService);
    const user: IUserDTO = await userServiceInstance.GetRandomUser();
    const logger: Logger = Container.get('logger');
    logger.info(`user: ${user}`);
    return res.status(200).send({user});
  });

};
