import api from "../../../utils/api"

const UpdatePasswordApi = async({oldPassword,newPassword})=>{

    try{
        const res = await api.post("/user/update-password",{oldPassword,newPassword});
        return res.data;

    }catch(err){
      console.log("error in update password api :",err);
      throw err;
    }
}

export default UpdatePasswordApi;