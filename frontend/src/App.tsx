import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes.tsx'
import { useEffect } from 'react';
import { testTripService } from './Test';

export const App = () => {
  // Run the test service once when the app loads
  useEffect(() => {
    testTripService();
  }, []);

  // Return the actual JSX for your app
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
};