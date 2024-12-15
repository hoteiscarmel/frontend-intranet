import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useNavigate } from 'react-router-dom'

export function WithAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return (props: P) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/')
      }
    }, [isAuthenticated, navigate])
    if (!isAuthenticated) {
      return null
    }
    return <WrappedComponent {...props} />
  }
}