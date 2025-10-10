import { createTheme, ThemeProvider } from '@mui/material/styles'
import Menu from './pages/Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: "#242425",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#242425",
          color: "#fff",
        },
      },
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
        <Menu />
    </ThemeProvider>
  )
}

export default App
