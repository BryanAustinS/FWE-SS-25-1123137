import { MantineThemeProvider, createTheme } from '@mantine/core';

// You can customize your theme here
const theme = createTheme({
  // Customize your theme if needed
  primaryColor: 'blue',
  // Add other theme customizations
});

export function MantineRoot({ children }: { children: React.ReactNode }) {
  return (
    <MantineThemeProvider theme={theme}>
      {children}
    </MantineThemeProvider>
  );
}