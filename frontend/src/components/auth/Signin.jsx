import React, { useContext } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import { commonModalClasses } from '../../utils/theme'
import FormContainer from '../form/FormContainer'
// import { ThemeContext } from '../../context/ThemeProvider'
// import { useTheme } from '../../hooks'

export default function Signin() {
  // const theme= useContext(ThemeContext) // we can use the line below because we created custom hook
  // const theme = useTheme()
  // console.log(theme.method())
  

  return (
    // <div className='fixed inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center'>
      <FormContainer>
        <Container>
            <form className={commonModalClasses + ' w-72'}>
                <Title> Sign in</Title>
                <FormInput label='Email' placeholder='Sanders@email.com' name='email'/>
                <FormInput label='Password' placeholder='********' name='password'/>
                <Submit value ='Sign In'/>
                
                <div className='flex justify-between'>
                    <CustomLink to='/auth/forget-password'> ForgetPassword</CustomLink>
                    <CustomLink to='/auth/signup'>Sign up</CustomLink>

                </div>
            </form> 
        </Container>
      </FormContainer>
    // </div>
  )
}
