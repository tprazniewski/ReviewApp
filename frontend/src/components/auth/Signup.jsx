import React, { useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userInfo;

  // const handleChange = (e)=>{
  //   e.target
  // }
  const handleChange = ({target})=>{
    // console.log(target.value, target.name)
    const {value,name} = target
    setUserInfo({...userInfo, [name]: value})
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    console.log(userInfo)
  }

  return (
    // <div className='fixed inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center'>
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title> Sign up</Title>
          <FormInput
            onChange={handleChange}
            value={name}
            label="Name"
            placeholder="Mike Sanders"
            name="name"
          />
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="Sanders@email.com"
            name="email"
          />
          <FormInput
            onChange={handleChange}
            value={password}
            type="password"
            label="Password"
            placeholder="********"
            name="password"
          />
          <Submit value="Sign up" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password"> ForgetPassword</CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
    // </div>
  );
}
