import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Surveys } from './pages/Surveys';
import { AuthProvider } from './context/auth';
import { PrivateRoute } from './components/PrivateRoute';
import { Register } from './pages/Register';
import { Users } from './pages/Users';
import { SurveyDetail } from './pages/SurveyDetail';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Surveys />} />
            <Route path="surveys/:id" element={<SurveyDetail />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
