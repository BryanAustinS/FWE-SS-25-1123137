import { MantineProvider as MantineBaseProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

// Create a custom theme with cyan color palette
const theme = createTheme({
  primaryColor: 'cyan',
  colors: {
    cyan: [
      '#E0F7FA', // 0: lightest
      '#B4F0F5', // 1
      '#8BE6F0', // 2
      '#60DDEB', // 3
      '#36D4E6', // 4
      '#2CEEEF', // 5: primary (Cyan #2CEEEF0)
      '#1BBBCC', // 6
      '#0E9DAD', // 7
      '#047D8F', // 8
      '#036370', // 9: darkest
    ],
    blueShades: [
      '#B4F5F0', // Tiffany Blue
      '#2CEEEF', // Cyan
      '#0476D0', // Blue Grotto
      '#041F60', // Dark Blue
      '#E0F7FA', // Light Cyan
      '#B4F0F5', // Light Blue
      '#8BE6F0', // Sky Blue
      '#60DDEB', // Aqua
      '#36D4E6', // Teal
      '#1BBBCC', // Deep Cyan
    ]
  },
  fontFamily: 'Inter, sans-serif',
  
  components: {
    Button: {
      defaultProps: {
        color: 'cyan.5',
      }
    },
    Badge: {
      defaultProps: {
        color: 'cyan.3',
      }
    },
    ActionIcon: {
      defaultProps: {
        color: 'cyan.5',
      }
    }
  }
});

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineBaseProvider theme={theme}>
      {children}
    </MantineBaseProvider>
  );
}