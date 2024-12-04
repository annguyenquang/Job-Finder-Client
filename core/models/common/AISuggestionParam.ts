import { Pagination } from '@/models/common/Pagination'
import { Metadata } from './Metadata'
import { metadata } from '../../../app/layout'
import { QueryParams } from '@/models/enum/MetadataValue'

export class AISuggestionParam {
  pagination: Pagination
  skills: string[]
  userId: string
  recentQueries: string[]
  provinceId: number | null

  constructor() {
    this.pagination = { page: 1, pageSize: 6 }
    this.userId = ''
    this.skills = []
    this.recentQueries = []
    this.provinceId = null
  }

  setPage(newPage: number): void {
    this.pagination.page = newPage
  }

  setQuery(newQueries: string[]) {
    this.recentQueries = newQueries
  }

  setSkills(newSkils: string[]) {
    this.skills = newSkils
  }

  setUserId(newId: string) {
    this.userId = newId
  }

  setProvinceId(newId: number | null) {
    this.provinceId = newId
  }

  setRecentQueries(newQueries: string[]) {
    const updateQueries = [...this.recentQueries, ...newQueries]
    this.recentQueries = updateQueries
  }
  constructParam(): string {
    let result = ''

    //Construct userId
    if (this.userId) result += `?UserId=${this.userId}`

    //Construct provinceId
    if (this.provinceId) result += `&JobFilter.ProvinceId=${this.provinceId}`
    //Construct query
    if (this.recentQueries) {
      this.recentQueries.forEach((e) => {
        result += `&LatestSearchKeywords=${e}`
      })
    }

    //Construct query
    if (this.recentQueries) {
      this.recentQueries.forEach((e) => {
        result += `&LatestSearchKeywords=${e}`
      })
    }

    //Construct query
    if (this.skills) {
      this.skills.forEach((e) => {
        result += `&AdditionSkills=${e}`
      })
    }

    //Construct pagination
    result += `&Pagination.Page=${this.pagination.page}&Pagination.PageSize=${this.pagination.pageSize}`

    return result
  }
}
