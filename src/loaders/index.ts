import Logger from './logger';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjector';

export default async({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('DB connected.');

  const userModel = {
    name: 'userModel',
    model: require('../models/user').default
  };

  await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel
    ]
  });
  Logger.info('Dependencies loaded');

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');
}
