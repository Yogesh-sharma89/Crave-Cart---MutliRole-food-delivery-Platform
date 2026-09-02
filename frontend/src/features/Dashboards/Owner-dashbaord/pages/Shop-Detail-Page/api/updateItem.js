import api from "../../../../../../utils/api";

const updateItemApi = async ({data, shopId, itemId}) => {

    if (!shopId || !itemId) {
        console.log("Shop Id or item id  is not found in update item api")
        return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            formData.append(key, value);
        }
    })

    const res = await api.put(`/shop/${shopId}/item/${itemId}`,formData);
    console.log('res in update item api : ',res.data.item);

    return res.data.item;
}

export default updateItemApi;