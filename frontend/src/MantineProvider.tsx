import { MantineProvider as MantineBaseProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

// Create a custom theme with navy blue as primary and yellow as secondary
const theme = createTheme({
  primaryColor: 'navyBlue',
  colors: {
    navyBlue: [
      "#edeffd",
      "#d7dbf4",
      "#aab4eb",
      "#7b8ae4",
      "#5567de",
      "#3e50da",
      "#3245da",
      "#2637c1",
      "#1f31ad",
      "#11227d" // 9: main
    ],
    yellow:[
      "#fffde1",
      "#fffacb",
      "#fff59a",
      "#fff064",
      "#ffeb38",
      "#ffe81d",
      "#ffe603",
      "#e3cc00",
      "#c9b600",
      "#ad9c00"
    ]
  },
  fontFamily: 'Inter, sans-serif',
  
  components: {
    Button: {
      defaultProps: {
        color: 'navyBlue.9',
      }
    },
    Badge: {
      defaultProps: {
        color: 'yellow.4',
      }
    },
    ActionIcon: {
      defaultProps: {
        color: 'navyBlue.5',
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