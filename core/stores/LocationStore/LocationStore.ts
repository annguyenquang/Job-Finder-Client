import { District, LocationService, Province } from "@/services";
import { create } from "zustand";

type LocationStore = {
    allProvince: Province[]
    allDistrict: District[]
    loadAllProvince:() => Promise<void>;
    loadAllDistrict:() => Promise<void>;
};

export const useLocationStore = create<LocationStore>((set, get) => ({
    allProvince: [],
    allDistrict: [],
    loadAllProvince: async () => {
        const res = await LocationService.getAllProvince();
        if (res) {
            set(() => ({
                allProvince: res,
            }));
        }
    },
    loadAllDistrict: async () => {
        const res = await LocationService.getAllDistrict();
        if (res) {
            set(() => ({
                allDistrict: res,
            }));
        }
    },
}));