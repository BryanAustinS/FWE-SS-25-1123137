import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.tsx'

export const App = () => {
  return (
  <BrowserRouter>
    <AppRoutes/>
  </BrowserRouter>
  )
};

