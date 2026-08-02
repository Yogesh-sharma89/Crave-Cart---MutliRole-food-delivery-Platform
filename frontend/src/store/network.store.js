import {create} from "zustand";

const useNetworkStore = create((set)=>({
    isOnline:navigator.onLine,

    setOnline:()=> set({isOnline:true}),
    setOffline:()=>set({isOnline:false})

}))
export default useNetworkStore;