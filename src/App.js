import { Routes, Route } from "react-router-dom";
import Navcomponent from "./components/Navbar/Navcomponent";

function App() {
  return (
    <div className="App">
          <Routes>
            <Route exact path="/*" element={<Navcomponent />} />
          </Routes>
    </div>
  );
}

export default App;
