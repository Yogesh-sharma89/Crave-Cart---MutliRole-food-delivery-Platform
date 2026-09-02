import api from "../../../../../../utils/api"

const addItemApi = async({data,currentShopId})=>{

    if(!currentShopId){
        console.log("Shop Id is not found")
        return;
    }

    const formData = new FormData();

     Object.entries(data).forEach(([key,value])=>{
        if(value!==null && value!==undefined){
            formData.append(key,value);
        }
     })
        const res = await  api.post(`/shop/${currentShopId}/item/create`,formData);
        console.log(res.data);
        
        return res.data;
}

export default addItemApi;