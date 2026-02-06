import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateResume from './pages/CreateResume';
import TemplateGallery from './pages/TemplateGallery';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create" element={<CreateResume />} />
            <Route path="templates" element={<TemplateGallery />} />
          </Route>
        </Routes>
      </Router>
    </ResumeProvider>
  );
}

export default App;
