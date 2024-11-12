import { http } from "@/services/http";

// https://country.io/phone.json
const getAllCountryPhoneCode = async () => {
    try {
        const url = "https://country.io/phone.json";
        const res = await http().get(url);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const PhoneNumberService = { getAllCountryPhoneCode }
