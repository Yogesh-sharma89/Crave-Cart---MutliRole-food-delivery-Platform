import api from "../../../../utils/api";

export const createShopApi = async (data) => {

    const { shopName, city, state, address, pincode, country = "India",shopImage } = data;

    console.log(shopImage);


    const formdata = new FormData();

    formdata.append("shopName", shopName);
    formdata.append("city", city);
    formdata.append("state", state);
    formdata.append("address", address);
    formdata.append("pincode", pincode);
    formdata.append("country", country);
    formdata.append("shopImage", shopImage);

    const res = await api.post("/shop/create-shop", formdata,{
        headers:{'Content-Type': 'multipart/form-data'}
    });

    console.log(res.data);

    return res.data;
}
