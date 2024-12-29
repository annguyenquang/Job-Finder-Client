import { District, LocationService, Province } from '@/services'
import { create } from 'zustand'

type LocationStore = {
  allProvince: Province[]
  allDistrict: District[]
  loadAllProvince: () => Promise<void>
  loadAllDistrict: () => Promise<void>
  getDistrictAndProvinceName: (districtId: number, provinceId: number) => string
}

export const useLocationStore = create<LocationStore>((set, get) => ({
  allProvince: [],
  allDistrict: [],
  loadAllProvince: async () => {
    const res = await LocationService.getAllProvince()
    if (res) {
      set(() => ({
        allProvince: res
      }))
    }
  },
  loadAllDistrict: async () => {
    const res = await LocationService.getAllDistrict()
    if (res) {
      set(() => ({
        allDistrict: res
      }))
    }
  },
  getDistrictAndProvinceName: (districtId: number, provinceId: number) => {
    const district = get().allDistrict.find((d) => d.code === districtId)
    const province = get().allProvince.find((p) => p.code === provinceId)
    const districtName = district ? district.name : ''
    const provinceName = province ? province.name : ''
    if (districtName && provinceName) {
      return `${districtName}, ${provinceName}`
    }
    return districtName + provinceName
  }
}))
