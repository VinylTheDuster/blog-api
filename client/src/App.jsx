import { createTheme, ThemeProvider } from '@mui/material/styles'
import Topbar from './components/STBar/Topbar'
import Sidebar from './components/STBar/Sidebar';

const theme = createTheme({
  palette: {
    primary: {
      main: "#242425",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
        <Topbar />
        <Sidebar />
    </ThemeProvider>
  )
}

export default App
