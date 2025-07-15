import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/common/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Search from './pages/Search';
import CampaignDetail from './pages/CampaignDetail';
import UserProfile from './pages/UserProfile';
import CreateCampaign from './pages/CreateCampaign';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import AdminDashboard from './pages/admin/AdminDashboard';
import Footer from './components/common/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            {/* Auth routes without header */}
            <Route 
              path="/auth/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/register" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Register />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/forgot-password" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <ForgotPassword />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth/reset-password" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <ResetPassword />
                </ProtectedRoute>
              } 
            />
            <Route path="/auth/verify-email" element={<VerifyEmail />} />
            
            {/* Main app routes with header */}
            <Route path="/*" element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/busca" element={<Search />} />
                    <Route path="/mesa/:id" element={<CampaignDetail />} />
                    <Route path="/perfil/:id" element={<UserProfile />} />
                    <Route 
                      path="/cadastro-campanha" 
                      element={
                        <ProtectedRoute>
                          <CreateCampaign />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;