import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import TemplateGallery from './pages/TemplateGallery';
import LoginPage from './pages/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Application Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              {/* Landing component is now the default "Home" for logged-in users, 
                  or we could make Dashboard the default. 
                  User requested: "After user login only show the main interface (Resumer.com the interface)" 
                  which usually implies the LandingPage content is now the "Home" of the app.
              */}
              <Route index element={<LandingPage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create" element={<CreateResume />} />
              <Route path="templates" element={<TemplateGallery />} />
            </Route>
          </Routes>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
