import api from "../../../utils/api"

export const LogoutApi = async () => {

    try {
        const res = await api.post('/user/logout');
        return res.data;

    } catch (err) {
        console.log("Error in logout api :", err.message);
        throw err;
    }

}

export const SignupApi = async ({ data }) => {
    try {

        const res = await api.post('/auth/signup', data);
        return res.data.user

    } catch (err) {
        console.log("Error in Signup api :", err.message);
        throw err;
    }
}

export const LoginApi = async({data})=>{
    
    try{
        const res = await api.post("/auth/login",data);
        return res.data.user;
    }catch(err){
       console.log("Error in login api :",err.message);
      throw err;
    }
}