import api from "../../../utils/api"

const DeleteAccountApi = async()=>{
    try{
        const res   = await api.post("/user/delete-account");
        return res.data

    }catch(err){
     console.log("Error in account deletion api :",err);
     throw err;
    }
}

export default DeleteAccountApi;