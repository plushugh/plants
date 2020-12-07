import { createMuiTheme } from "@material-ui/core/styles"
import blue from "@material-ui/core/colors/blue"
import common from '@material-ui/core/colors/common';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    text: {
      secondary: common.white
    }
  }
});

export default theme;