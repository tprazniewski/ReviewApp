import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();



export default function ThemeProvider({ children }) {
  const defaultTheme = 'light'
  const darkTheme = 'dark'

  const toggleTheme = () => {
    const oldTheme = localStorage.getItem('theme')
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme
    document.documentElement.classList.add(newTheme)
    document.documentElement.classList.remove(oldTheme)
    // console.log(document.documentElement)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(()=> {
    
    const theme = localStorage.getItem('theme')
    if(!theme) document.documentElement.classList.add(defaultTheme)
    else document.documentElement.classList.add(theme)
  },[])

  return( 
    <ThemeContext.Provider value={{theme:'darkTest', toggleTheme}}>
    {children}
    </ThemeContext.Provider>
  )
}
