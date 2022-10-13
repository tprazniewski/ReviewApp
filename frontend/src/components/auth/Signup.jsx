import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import { commonModalClasses } from '../../utils/theme'
import FormContainer from '../form/FormContainer'

export default function Signup() {
  return (
    // <div className='fixed inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center'>
      <FormContainer>
        <Container>
            <form className= {commonModalClasses + ' w-72'}>
                <Title> Sign up</Title>
                <FormInput label='Name' placeholder='Mike Sanders' name='name'/>
                <FormInput label='Email' placeholder='Sanders@email.com' name='email'/>
                <FormInput label='Password' placeholder='********' name='password'/>
                <Submit value ='Sign up'/>
                
                <div className='flex justify-between'>
                    <CustomLink to='/auth/forget-password'> ForgetPassword</CustomLink>
                    <CustomLink to='/auth/signin'>Sign in</CustomLink>

                </div>
            </form> 
        </Container>
      </FormContainer>
    // </div>
  )
}
