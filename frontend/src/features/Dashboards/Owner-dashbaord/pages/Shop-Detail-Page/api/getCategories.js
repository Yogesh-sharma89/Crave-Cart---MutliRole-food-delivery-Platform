import api from "../../../../../../utils/api"

const getCategories = async () => {
    try {

        const res = await api.get("/shop/categories");
        console.log('Categories data : ', res.data);

        return res.data.categories;

    } catch (err) {
        console.log("error in get categories api : ", err.message)
    }
}

export default getCategories;