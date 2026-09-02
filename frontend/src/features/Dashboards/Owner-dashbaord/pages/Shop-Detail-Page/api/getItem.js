import api from "../../../../../../utils/api";

const getItemApi = async(shopId)=>{
    if(!shopId){
        console.log("Shopid is not defined in getitem api");
        return;
    }
    try{

        const res = await api.get(`/shop/${shopId}/allItems`);
        console.log("Res in get item api :",res.data.items)
        return res.data.items;

    }catch(err){
      console.log("Error in get item api :",err.message);
    }
}

export default getItemApi;