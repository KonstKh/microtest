import { Container } from 'typedi';
import LoggerInstance from './logger';

export default ({ mongoConnection, models }: { mongoConnection; models: { name: string, model: any }[] }) => {
  try {
    models.forEach(m => { Container.set(m.name, m.model) });
    Container.set('logger', LoggerInstance);
    return {};
  } catch (err) {
    LoggerInstance.error(`Dependency injection error: ${err}`);
    throw err;
  }
};
