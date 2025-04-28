import { MantineProvider as MantineBaseProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

// Create a custom theme
const theme = createTheme({
  primaryColor: 'blue',
  // You can customize colors, spacing, fonts, etc.
  fontFamily: 'Inter, sans-serif',
});

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineBaseProvider theme={theme}>
      {children}
    </MantineBaseProvider>
  );
}