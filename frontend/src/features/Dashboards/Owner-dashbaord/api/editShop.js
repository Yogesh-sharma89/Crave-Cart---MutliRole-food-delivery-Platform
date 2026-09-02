import api from "../../../../utils/api"

export const updateShopApi = async (shopId, shopData) => {

    if (!shopId || !shopData) {
        console.log("shopId and shopdata is required");
        return;
    }

    const formdata = new FormData();

    Object.entries(data).map(([keyframes, value]) => {
        formdata.append(keyframes, value)
    })

    console.log(formdata);

    const res = await api.put(`/shop/update-shop/${shopId}`, formdata);
    console.log(res.data);
    return res.data;

}