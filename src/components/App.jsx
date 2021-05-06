import Home from './Home'
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#f34335"
        }
    }
})

function App() {
    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Home/>
    </ThemeProvider>;
}

export default App;
