import React from 'react';
import { Navigate } from 'react-router-dom'
import IsLoggedIn from './IsLoggedIn'

function ProtectedRoute ({ children }: { children: React.ReactNode }) {
	if (!IsLoggedIn()) {
		return <Navigate to="/login" replace />
	}
	return children
}

export default ProtectedRoute