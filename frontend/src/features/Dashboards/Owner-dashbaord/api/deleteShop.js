import api from "../../../../utils/api"

export const deleteShop = async(shopId)=>{

    if(!shopId){
      console.log('ShopId not avaibale in delete shop api ');
      return;
    }

    try{

    const res = await api.delete(`/shop/delete-shop/${shopId}`)
    return res.data;

  }catch(err){
    console.log("Error in delete shop api on frontend : ",err.messgage)
  }
}

export default deleteShop;