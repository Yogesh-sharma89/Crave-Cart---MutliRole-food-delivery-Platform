import api from "../../../utils/api"

const VerifyEmailApi = async({email})=>{

    try{
        const res = await api.post("/auth/send-otp",{email});
        return res.data;
    }catch(err){
       console.log("Error in verify email api :",err);
       throw err;
    }
}

export default VerifyEmailApi;