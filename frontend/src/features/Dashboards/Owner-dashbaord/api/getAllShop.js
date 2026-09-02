import api from "../../../../utils/api"

export const getAllShops = async () => {
    try {
        const res = await api.get("/shop/all-shops");
        console.log(res.data);
        return res.data.shops;

    } catch (err) {
        console.log("error in get all shop api :", err.message);
        throw err;
    }
}


export const getShopbyId = async(shopId)=>{
    
    if(!shopId){
        console.log("shop Id is not available in get shop api");
        return;
    }

    const res = await api.get(`/shop/${shopId}`);
    console.log('Data in get shop Id :',res.data.shop)
    return res.data.shop
}