import {
  DI,
  initializeDI,
} from './dependency-injection';

initializeDI();

try {
  DI.server.start();
} catch (error) {
  console.error(
    'Error starting server:',
    error
  );
  process.exit(1);
}
