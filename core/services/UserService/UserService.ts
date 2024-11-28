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
      certifications: params.certifications.map((certification) => {
        let issueDate = null
        let expirationDate = null
        if (typeof certification.issueDate === 'string') {
          issueDate = certification.issueDate
        } else if (certification.issueDate) {
          issueDate = dateToString(certification.issueDate)
        }
        if (typeof certification.expirationDate === 'string') {
          expirationDate = certification.expirationDate
        } else if (certification.expirationDate) {
          expirationDate = dateToString(certification.expirationDate)
        }
        return {
          name: certification.name,
          credentialId: certification.credentialId ?? null,
          issuingOrganization: certification.issuingOrganization,
          issueDate: issueDate,
          expirationDate: expirationDate
        }
      })
    }
    const res = await http().post<ApiResult<string>>(url, body)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const UserService = { updateUser }
