
import crypto from "crypto";

export const GenerateOtp = (length=6)=>{
    const max = 10**length;

    const otp = crypto.randomInt(max).toString().padStart(length, "0");

    return otp;
}