import { Routes, Route } from "react-router-dom";
import Navcomponent from "./components/Navbar/Navcomponent";
import { ThemeProvider } from "@mui/material";
import theme from "./components/Theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path="/*" element={<Navcomponent />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
