import { useState, useCallback, useMemo } from "react"
import { AUTH_TOKEN_KEY } from "../services/http"

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem(AUTH_TOKEN_KEY)
  )

  const isAuthenticated = useMemo(() => !!token, [token])

  const login = useCallback((newToken: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, newToken)
    setToken(newToken)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    setToken(null)
  }, [])

  const checkAuth = useCallback(() => {
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)
    setToken(storedToken)
    return !!storedToken
  }, [])

  return {
    token,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  }
}
