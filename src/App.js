import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/Layouts/AuthLayout";
import UserDashboardLayout from "./components/Layouts/UserDashboardLayout";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { StrictMode } from "react";
import { AuthProvider } from "./store/auth" 

function App() {
  return (
      <StrictMode>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route exact path="/*" element={<UserDashboardLayout />} />
              <Route exact path="/auth/*" element={<AuthLayout />} />
            </Routes>
          </div>
        </AuthProvider>
      </StrictMode>
  );
}

export default App;
