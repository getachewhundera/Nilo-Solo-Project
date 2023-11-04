import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
      contrastText: grey[50]
    },
    secondary: {
      main: grey[900],
      contrastText: grey[50]
    },
  },
});

theme.props = { 
    MuiButtons: {
        disableElevation: true
    }
}; 

theme.overrides = {
    MuiButton: { 
        root: { 
            borderRadius: 0, 
            textTransform: 'none'
        }, 
        containedPrimary: {
            "&:hover": {
                backgroundColor: grey[600],
                color: grey[50]
            }
        }, 
        containedSecondary: {
            fontWeight: 700
        }
        
    }

}

export default theme; 