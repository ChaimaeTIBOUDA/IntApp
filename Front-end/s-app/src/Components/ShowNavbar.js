import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ShowNavbar({children}) {
    const location = useLocation()
    const [showHeader, setShowHeader] = useState(true)
    useEffect(() => {
        if (location.pathname === '/Login')
        {
            setShowHeader(false)
        }
        else {
            setShowHeader(true)
        }
    }, [location])
  return (
    <div>
      {showHeader && children}
    </div>
  )
}
