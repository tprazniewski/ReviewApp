import React from 'react'
import CustomLink from '../CustomLink'
import Container from '../Container'
import FormInput from '../form/FormInput'
import Title from '../form/Title'
import Submit from '../form/Submit'

export default function ForgetPassword() {
  return (

    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center'>
    <Container>
        <form className='bg-secondary rounded p-6 w-96 space-y-6'>
            <Title> Please Enter Your Email</Title>
            <FormInput label='Email' placeholder='Sanders@email.com' name='email'/>
            <Submit value ='Send Link'/>
            
            <div className='flex justify-between'>
                <CustomLink to='/auth/signin'> Sign In</CustomLink>
                <CustomLink to='/auth/signup'>Sign up</CustomLink>

            </div>
        </form> 
    </Container>
</div>
    )
}