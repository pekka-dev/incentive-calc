import Home from './Home'
import {createMuiTheme, ThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#f34335"
        }
    }
})

function App() {
    return <ThemeProvider theme={theme}>
        <Home/>
    </ThemeProvider>;
}

export default App;
