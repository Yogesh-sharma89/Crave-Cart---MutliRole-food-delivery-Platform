import api from "../../../utils/api"

const ForgotPasswordApi = async({email})=>{

    try{
        const res = await api.post("/auth/forgot-password",{email});
        return res.data;
    }catch(err){
     console.log("Error in forgot password api :",err)
     throw err;
    }

}

export default ForgotPasswordApi