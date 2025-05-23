import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/dashboard" />
            </ProtectedRoute>
          } />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />

          {/* Catch All route in 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
