import './App.css'
import './index.css'
import './components/MainPage.tsx';
import MainPage from './components/MainPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import RegisterPage from './components/RegisterPage.tsx';
import VerifyPage from './components/VerifyPage.tsx';
import LobbyPage from './components/LobbyPage.tsx';
import RoomListPage from './components/RoomListPage.tsx';
import RoomPage from './components/RoomPage.tsx';
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
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/lobby" element={<ProtectedRoute><LobbyPage /></ProtectedRoute>} />
      <Route path="/rooms" element={<ProtectedRoute><RoomListPage /></ProtectedRoute>} />
      <Route path="/room/:roomid" element={<ProtectedRoute><RoomPage /></ProtectedRoute>} />
      <Route path="/game/:gameid" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
