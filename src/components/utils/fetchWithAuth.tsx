import { useNavigate } from 'react-router-dom'

let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const modifiedInit: RequestInit = {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  }

  let response = await fetch(input, modifiedInit)

  if (response.status !== 401) return response

  // accessToken 만료 시도
  if (!isRefreshing) {
    isRefreshing = true
    refreshPromise = tryRefreshToken().finally(() => {
      isRefreshing = false
    })
  }

  const refreshResult = await refreshPromise

  if (!refreshResult) {
    throw new Error("Token refresh failed")
  }

  // 재요청
  const retryInit: RequestInit = {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    }
  }

  return fetch(input, retryInit)
}

async function tryRefreshToken(): Promise<boolean> {
	const navigate = useNavigate()
	const refreshToken = localStorage.getItem("refreshToken")
	if (!refreshToken) {
		alert("로그인이 필요합니다.")
		navigate("/")
	}

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    })

    if (!res.ok){
      alert("로그인 세션이 만료되었습니다.")
		  navigate("/")
    }

    const data = await res.json()
    if (data.accessToken && data.refreshToken) {
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      return true
    }

    return false
  } 
  catch {
    return false
  }
}

export default fetchWithAuth