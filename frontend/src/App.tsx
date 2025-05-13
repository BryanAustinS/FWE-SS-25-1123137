import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.tsx';
import { MantineProvider } from './MantineProvider';
import { MantineRoot } from './components/MantineRoot.tsx';
import { ModalsProvider } from '@mantine/modals';

export const App = () => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <MantineRoot>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </MantineRoot>
      </ModalsProvider>
    </MantineProvider>
  );
};
