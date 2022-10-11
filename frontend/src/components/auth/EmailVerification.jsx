import React, { useState } from "react";
import CustomLink from "../CustomLink";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";

const OTP_LENGTH = 6;

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
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
                  type="number"
                  className="w-12 h-12 border-2 rounded border-dark-subtle focus:border-white bg-transparent outline-none text-center text-white text-xl "
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
