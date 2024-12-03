import { ApiResult, Company, SuggestionResponse } from '@/models'
import { http } from '@/services/http'

const getSuggestion = async (param: string) => {
  try {
    const url = `/Job/GetSuggestionByLatestSearchKeyword/${param}`
    const res = await http().get<ApiResult<SuggestionResponse>>(url)
    return res.data
  } catch (error) {
    console.log(error)
  }
}
