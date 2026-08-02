import { create } from "zustand";
import { toast } from "sonner";
import axios from "axios";

const locationApi = import.meta.env.VITE_GEOCODING_API;

const useLocationStore = create((set) => ({

    location:  JSON.parse(localStorage.getItem("location")) ||  null,
    loading: false,

    error: null,

    getCoordinates: async () => {
        set({ loading: true, error: null })

        if (!navigator || !navigator.geolocation) {
            set({ loading: false, error: "Geolocation API is not available on this browser." })
            return;
        }

        const highAccuracyOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        try {

            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, highAccuracyOptions)
            })

            console.log(position);
            const { latitude, longitude } = position.coords;

            //now get location
            const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${locationApi}`);

            const { city, country, state, postcode } = res.data.results[0];

            localStorage.setItem("location", JSON.stringify({ city, country, state, postcode }))
            
            set({ location: { city, country, state, postcode }, error: null })

            toast.success("Got your location");


        } catch (err) {
            console.log("Failed to get location", err.message);
            set({ position: null, error: err.message });
            toast.error(err.message);

        } finally {
            set({ loading: false })
        }
    }
}))

export default useLocationStore;