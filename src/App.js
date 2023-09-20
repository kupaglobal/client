import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/Layouts/AuthLayout";
import UserDashboardLayout from "./components/Layouts/UserDashboardLayout";
import Navcomponent from "./components/Navbar/Navcomponent";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


function App() {
  return (
      <div className="App">
        <Routes>
        <Route exact path="/*" element={<UserDashboardLayout />} />
        <Route exact path="/auth/*" element={<AuthLayout />} />
        </Routes>
      </div>
  );
}

export default App;
