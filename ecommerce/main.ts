import { App } from './backend/src/core/App';
import { Logger } from './backend/src/core/Logger';

const PORT = Number(process.env.PORT) || 8000;

Logger.info('Starting NexusCart Enterprise Platform via root entry point main.ts...');
const app = new App();

app.listen(PORT, () => {
  Logger.info(`NexusCart Enterprise Server active on http://0.0.0.0:${PORT}`);
});
