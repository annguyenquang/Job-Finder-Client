import { http } from '@/services/http'
import { AxiosResponse } from 'axios'

export type District = {
  name: string
  code: number
}

export type Province = {
  name: string
  code: number
  districts: District[]
}

const DEFAULT_PROVINCE_URL = 'https://provinces.open-api.vn/api/p'
const DEFAULT_DISTRICT_URL = 'https://provinces.open-api.vn/api/d'

const getDistrictsByProvinceId = async (provinceId: number): Promise<District[] | undefined> => {
  try {
    const res: AxiosResponse<Province> = await http().get(`${DEFAULT_PROVINCE_URL}/${provinceId}?depth=2`, {
      baseURL: ''
    })
    console.log(res.data)
    return res.data.districts
  } catch (error) {
    console.log(error)
  }
}

const searchProvince = async (query: string): Promise<Province[] | undefined> => {
  try {
    const res: AxiosResponse<Province[]> = await http().get(`${DEFAULT_PROVINCE_URL}/search/?q=${query}`, {
      baseURL: ''
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const LocationService = { getDistrictsByProvinceId, searchProvince }
