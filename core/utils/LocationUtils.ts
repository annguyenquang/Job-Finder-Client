'use client'
import { LocationService, Province } from '@/services'

export const getProvinceName = async (provinceId: number) => {
  try {
    const province: Province | undefined = await LocationService.getProvinceById(provinceId)
    return province?.name
  } catch (error) {
    console.log('Cannot get province name!')
  }
}
