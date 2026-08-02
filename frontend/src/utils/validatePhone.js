import { parsePhoneNumberFromString } from "libphonenumber-js";


export const ValidatePhone = (value)=>{
  const phone = parsePhoneNumberFromString(value);

  if(!phone){
     return "Please enter a valid phone number.";
  }

  return (
     phone.isValid() || "Please enter a valid phone number."
  )
} 