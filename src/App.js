import { StrictMode } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/Layouts/AuthLayout";
import UserDashboardLayout from "./components/Layouts/UserDashboardLayout";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { AuthProvider } from "./store/auth" 
import { ToastProvider } from "./store/toast";
import { StudentsProvider } from "./store/students";
import { TemplatesProvider } from "./store/templates";
import { AssessmentsProvider } from "./store/assessments";
import ToastContainer from "./components/UI/Toast";
import { OrganisationProvider } from "./store/organisation";

function App() {
  return (
      <StrictMode>
        <AuthProvider>
          <ToastProvider>
            <StudentsProvider>
              <AssessmentsProvider>
                <TemplatesProvider>
                  <OrganisationProvider>
                    <div className="App">
                      <ToastContainer/>
                      <Routes>
                        <Route exact path="/*" element={<UserDashboardLayout />} />
                        <Route exact path="/auth/*" element={<AuthLayout />} />
                      </Routes>
                    </div>
                    </OrganisationProvider>
                </TemplatesProvider>
              </AssessmentsProvider>
            </StudentsProvider>
          </ToastProvider>
        </AuthProvider>
      </StrictMode>
  );
}

export default App;
