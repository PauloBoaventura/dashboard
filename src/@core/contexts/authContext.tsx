'use client'

// React Imports
import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'

// Auth type
export type Auth = {
  user: {
    id: string
    name: string
    email: string
    role: string
  } | null
  isAuthenticated: boolean
  isLoading: boolean
}

// AuthContextProps type
type AuthContextProps = {
  auth: Auth
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
}

type Props = {
  children: ReactNode
}

// Initial auth state
const initialAuth: Auth = {
  user: null,
  isAuthenticated: false,
  isLoading: false
}

// Initial Auth Context
export const AuthContext = createContext<AuthContextProps>({
  auth: initialAuth,
  login: async () => {},
  logout: async () => {},
  register: async () => {}
})

// Auth Provider
export const AuthProvider = (props: Props) => {
  const login = async (email: string, password: string) => {
    // Implement login logic here
    console.log('Login attempt:', { email, password })
  }

  const logout = async () => {
    // Implement logout logic here
    console.log('Logout attempt')
  }

  const register = async (name: string, email: string, password: string) => {
    // Implement register logic here
    console.log('Register attempt:', { name, email, password })
  }

  const authContextValue = useMemo(
    () => ({
      auth: initialAuth,
      login,
      logout,
      register
    }),
    []
  )

  return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>
}

// Auth Hook
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
} 
