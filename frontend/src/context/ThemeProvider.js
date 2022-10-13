import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();



export default function ThemeProvider({ children }) {
  const defaultTheme = 'light'
  const darkTheme = 'dark'

  const toggleTheme = () => {
    const oldTheme = getTheme()
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme
    updateTheme(newTheme, oldTheme)

    // console.log(document.documentElement)
  }

  useEffect(()=> {
    
    const theme = getTheme()
    if(!theme) updateTheme(defaultTheme)
    else updateTheme(theme)
  },[])

  return( 
    <ThemeContext.Provider value={{theme:'darkTest', toggleTheme}}>
    {children}
    </ThemeContext.Provider>
  )
}

const getTheme = () => localStorage.getItem('theme')
const updateTheme = (theme, themeToRemove) => {
  if(themeToRemove) document.documentElement.classList.remove(themeToRemove)
  document.documentElement.classList.add(theme)
  // console.log(document.documentElement)
  localStorage.setItem('theme', theme)
}