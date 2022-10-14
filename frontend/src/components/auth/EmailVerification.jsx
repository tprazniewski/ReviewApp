import React, { useEffect, useState, useRef } from "react";
import CustomLink from "../CustomLink";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { verifyUseremail } from "../../api/auth";

const OTP_LENGTH = 6;
let currentOTPIndex;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();
  const { state } = useLocation();
  const user = state?.user;
  const navigate = useNavigate();

  const focusNextInputField = (index) => setActiveOtpIndex(index + 1);
  const focusPreviousInputField = (index) => {
    let nexIndex;
    const diff = index - 1;
    nexIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nexIndex);
  };

  //e.target.value
  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    // newOtp[index] = value.substring(value.length-1, value.length)
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);
    console.log("value inside handler", value);

    // if(!value) focusPreviousInputField(index)
    if (!value) focusPreviousInputField(currentOTPIndex);
    else {
      focusNextInputField(currentOTPIndex);
    }
    // setOtp([value])
    setOtp([...newOtp]);
  };

  const handleKeydown = ({ key }, index) => {
    console.log("keydownKey:", key, " keeydown:index", index);
    currentOTPIndex = index;

    if (key === "Backspace") {
      focusPreviousInputField(currentOTPIndex);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  console.log("inputRef!", inputRef);

  useEffect(() => {
    if (!user) navigate("/not-Found");
  }, [user]);
  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidOTP(otp)) return console.log("invalid otp");

    const { error, message } = await verifyUseremail({
      OTP: otp.join(''),
      userId: user.id,
    });

    if (error) return console.log(error);

    console.log(message);
    // console.log('is Valid otp:',otp)
  };
  return (
    // <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title> Please enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              {" "}
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4 ">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  // onChange = {(e) => handleOtpChange(e,index)}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeydown(e, index)}
                  className="w-12 h-12 border-2 rounded dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary bg-transparent outline-none text-center dark:text-white text-primary text-xl .spin-button-none:"
                ></input>
              );
            })}
          </div>
          <Submit value="Verify Account"></Submit>
        </form>
      </Container>
    </FormContainer>
    // </div>
  );
}
