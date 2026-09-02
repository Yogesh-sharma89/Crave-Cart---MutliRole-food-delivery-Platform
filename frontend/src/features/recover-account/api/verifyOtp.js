import api from "../../../utils/api"

const VerifyOtpApi = async({email,otp})=>{

    if(!email.trim() || !otp.trim()){
        console.log("email or otp is missing");
        return;
    }

    try{
        const res = await api.post("/auth/verify-otp",{email,otp});
        return res.data;
    }catch(err){
      console.log("Error in verify otp api :",err);
      throw err;
    }
}
export default VerifyOtpApi;