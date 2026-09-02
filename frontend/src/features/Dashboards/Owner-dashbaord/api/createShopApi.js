import api from "../../../../utils/api";

export const createShopApi = async (data) => {

    const formdata = new FormData();

     Object.entries(data).map(([keyframes,value])=>{
        formdata.append(keyframes,value)
     })

    const res = await api.post("/shop/create-shop", formdata);

    console.log(res.data);

    return res.data.shop;
}
