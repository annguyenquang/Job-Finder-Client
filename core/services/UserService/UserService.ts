import type { ApiResult, UpdateUserBody, UpdateUserParams } from '@/models'
import { http } from '../http'
import { dateToString } from '@/utils'

const updateUser = async (id: string, params: UpdateUserParams) => {
  try {
    const url = `/User/UpdateUser?id=${id}`
    const body: UpdateUserBody = {
      firstName: params.firstName,
      lastName: params.lastName,
      dateOfBirth: dateToString(params.dateOfBirth),
      skills: params.skills,
      selfDescription: params.selfDescription,
      certifications: params.certifications
    }
    console.log('Body', body)
    const res = await http().post<ApiResult<string>>(url, body)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const UserService = { updateUser }
