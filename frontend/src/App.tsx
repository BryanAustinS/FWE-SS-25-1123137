import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.tsx'
import { MantineProvider } from './MantineProvider';
import { MantineRoot } from './components/MantineRoot.tsx';

export const App = () => {
  return (
    <MantineProvider>
      <MantineRoot>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </MantineRoot>
    </MantineProvider>
  );
};