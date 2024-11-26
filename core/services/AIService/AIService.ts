import { ApiResult, Company } from '@/models'
import { http } from '@/services/http'

const getSuggestion = async (param: string) => {
  try {
    const url = `/Job/GetSuggestionByLatestSearchKeyword/${param}`
    const res = await http().get<ApiResult<Company>>(url)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
