import { App } from './core/App';
import { Logger } from './Logger';

const PORT = Number(process.env.PORT) || 8000;

function bootstrap() {
  Logger.info('Bootstrapping NexusCart Enterprise E-Commerce Platform...');
  const application = new App();

  application.listen(PORT, () => {
    Logger.info(`NexusCart Server process ${process.pid} is running successfully on port ${PORT}`);
  });
}

bootstrap();
