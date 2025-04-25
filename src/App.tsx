import './App.css'
import './index.css'
import './components/MainPage.tsx';
import MainPage from './components/MainPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import AuthenticatePage from './components/AuthenticatePage.tsx'
import RegisterPage from './components/RegisterPage.tsx';
import VerifyPage from './components/VerifyPage.tsx';
import LobbyPage from './components/LobbyPage.tsx';
import RoomListPage from './components/RoomListPage.tsx';
import GamePage from './components/GamePage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import NotFoundPage from './components/NotFoundPage.tsx';

import {Route, Routes, Navigate } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route index element={<Navigate to={"/main"} replace />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/authenticate" element={<AuthenticatePage />} />
      <Route path="/register" element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
      <Route path="/verify" element={<ProtectedRoute><VerifyPage /></ProtectedRoute>} />
      <Route path="/lobby" element={<ProtectedRoute><LobbyPage /></ProtectedRoute>} />
      <Route path="/rooms" element={<ProtectedRoute><RoomListPage /></ProtectedRoute>} />
      <Route path="/game/:gameid" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
