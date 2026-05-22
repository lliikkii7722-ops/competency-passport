import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import PublicProfile from './pages/PublicProfile';
import SkillGap from './pages/SkillGap';
import Badges from './pages/Badges';
import MockInterview from './pages/MockInterview';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 max-w-7xl">
              <Routes>
                <Route path="/badges" element={<ProtectedRoute><Badges /></ProtectedRoute>} />
                <Route path="/mock-interview" element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
                <Route path="/public/profile/:slug" element={<PublicProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
                <Route path="/experience" element={<ProtectedRoute><Experience /></ProtectedRoute>} />
                <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/skill-gap" element={<ProtectedRoute><SkillGap /></ProtectedRoute>} />
                <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;