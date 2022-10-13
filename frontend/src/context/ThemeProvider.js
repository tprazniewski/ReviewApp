import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();



export default function ThemeProvider({ children }) {

  const toggleTheme = () => {
    document.documentElement.classList.add('dark')
    // console.log(document.documentElement)
    localStorage.setItem('theme', 'dark')
  }

  useEffect(()=> {
    const theme = localStorage.getItem('theme')
    document.documentElement.classList.add(theme)
  },[])

  return( 
    <ThemeContext.Provider value={{theme:'darkTest', toggleTheme}}>
    {children}
    </ThemeContext.Provider>
  )
}
