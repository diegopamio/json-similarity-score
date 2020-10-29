import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#12b7e3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#383f43',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
      accent: '#edf1f3',
    },
    text: {
      primary: '#374043',
      secondary: '#007899',
    },
  },
});

export default theme;
