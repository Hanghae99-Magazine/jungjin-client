import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegistPage from './pages/RegistPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/regist" element={<RegistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
