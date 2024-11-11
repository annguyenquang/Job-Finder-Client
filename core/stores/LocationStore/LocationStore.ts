import { LocationService, Province } from "@/services";
import { create } from "zustand";

type LocationStore = {
    allProvince: Province[]
    loadAllProvince:() => Promise<void>;
};

export const useLocationStore = create<LocationStore>((set, get) => ({
    allProvince: [],
    loadAllProvince: async () => {
        const res = await LocationService.getAllProvince();
        if (res) {
            set(() => ({
                allProvince: res,
            }));
        }
    },
}));