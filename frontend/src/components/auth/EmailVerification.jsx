import React, { useEffect, useState, useRef } from "react";
import CustomLink from "../CustomLink";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";

const OTP_LENGTH = 6;

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] =useState(0)

  const inputRef = useRef()
  //e.target.value
  const handleOtpChange= ({target}, index) => {
    const {value} =target
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length-1, value.length)
    setOtp([...newOtp])
    console.log('value inside handler',value)
    setActiveOtpIndex(index+1)
    // setOtp([value])
  }

  useEffect(()=> {
    inputRef.current?.focus()
  },[activeOtpIndex])

console.log('inputRef!',inputRef)

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 space-y-6">
          <div>
            <Title> Please enter the OTP to verify your account</Title>
            <p className="text-center text-dark-subtle">
              {" "}
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4 ">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex=== index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ''}
                  onChange = {(e) => handleOtpChange(e,index)}
                  className="w-12 h-12 border-2 rounded border-dark-subtle focus:border-white bg-transparent outline-none text-center text-white text-xl .spin-button-none:"
                ></input>
              );
            })}
          </div>
          <Submit value="Send Link"></Submit>
        </form>
      </Container>
    </div>
  );
}
