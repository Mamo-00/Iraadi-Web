import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthUserProvider } from './firebase/auth';

function App() {
  return (
    <AuthUserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthUserProvider>
  );
}

export default App;
