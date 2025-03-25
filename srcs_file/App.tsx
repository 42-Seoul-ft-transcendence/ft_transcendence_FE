import { Route, Routes, Navigate } from "react-router-dom"
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"
import LobbyPage from "./pages/LobbyPage"
import RegisterPage from "./pages/RegisterPage"
import MypagePage from "./pages/MypagePage"
import RoomPage from "./pages/RoomPage"
import GamePage from "./pages/GamePage"
import ProtectedRoute from "./pages/ProtectedRoute"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
      <Routes>
        <Route index element={<Navigate to={ "/main" } replace />} /> 
        <Route path="/main" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/lobby" element={<ProtectedRoute><LobbyPage /></ProtectedRoute>} />
        <Route path="/mypage/:userid" element={<ProtectedRoute><MypagePage /></ProtectedRoute>} />
        <Route path="/room/:roomid" element={<ProtectedRoute><RoomPage /></ProtectedRoute>} />
        <Route path="/game/:gameid" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  )
}

export default App 