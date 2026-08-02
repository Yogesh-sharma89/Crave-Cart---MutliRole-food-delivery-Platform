import api from "../../../../utils/api"

export const getAllShops = async () => {
    try {
        const res = await api.get("/shop/all-shops");
        console.log(res.data);
        return res.data;

    } catch (err) {
        console.log("error in get all shop api :", err.message);
    }
}