import api from "../../../utils/api";

export const completeProfileApi = async({phone,role})=>{

    try{
     const res = await api.patch('/user/complete-profile',{phone,role});
     return res.data;

    }catch(err){
       console.log("Error in complete profile api : ",err.message);
       throw err;
    }
}