import api from "../../../../utils/api"

export const editShop = async(shopId,shopData)=>{
    try{

        // console.log("Shop data :",shopData);
        console.log("Shop id :",shopId)

        const res = await api.put(`/shop/update-shop/${shopId}`,shopData);
        console.log(res.data);
        return res.data;

    }catch(err){
     console.log("error in edit shop api on frontend :",err.message)
    }
}