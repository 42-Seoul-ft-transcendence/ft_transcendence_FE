import './App.css'
import './index.css'
import './components/MainPage.tsx';
import MainPage from './components/MainPage.tsx';

import {Route, Routes, Navigate } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route index element={<Navigate to={"/main"} replace />} />
      <Route path="/main" element={<MainPage />} />
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lobby" element={<ProtectedRoute><LobbyPage /></ProtectedRoute>} />
      <Route path="/room/:roomid" element={<ProtectedRoute><RoomPage /></ProtectedRoute>} />
      <Route path="/game/:gameid" element={<ProtectedRoute><GamePage /></ProtectedRoute>} /> */}
    </Routes>
  )
}

export default App
