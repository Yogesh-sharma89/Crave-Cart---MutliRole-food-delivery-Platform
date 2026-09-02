import api from "../../../../../../utils/api";

const deleteItemApi = async({itemId,shopId})=>{

    if(!itemId){
        console.log("Item Id is missing in delete API");
        return;
    }

    const res = await api.delete(`/shop/${shopId}/item/${itemId}`);

    return res.data;
}

export default deleteItemApi;