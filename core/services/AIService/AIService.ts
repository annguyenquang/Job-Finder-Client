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

const getRelativeJobByJobId = async (jobId: string) => {
  try {
    const url = `/Job/GetRelativeJobByJobId?jobId=${jobId}`
    const res = await http().get<ApiResult<SuggestionResponse>>(url)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const AIService = { getSuggestion, getRelativeJobByJobId }
