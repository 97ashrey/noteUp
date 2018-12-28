import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#8bc34a',
      light: '#cce6b3'
    },
  },
});

export default defaultTheme;
