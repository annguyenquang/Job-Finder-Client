import { Pagination } from '@/models/common/Pagination'
import { Metadata } from './Metadata'
import { metadata } from '../../../app/layout'
import { QueryParams } from '@/models/enum/MetadataValue'

export class AISuggestionParam {
  pagination: Pagination
  skills: string[]
  userId: string
  recentQueries: string[]

  constructor() {
    this.pagination = { page: 1, pageSize: 6 }
    this.userId = ''
    this.skills = []
    this.recentQueries = []
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
  constructParam(): string {
    let result = ''

    //Construct userId
    if (this.userId) result += `?UserId=${this.userId}`

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
        result += `&Skill=${e}`
      })
    }

    //Construct pagination
    result += `&Pagination.Page=${this.pagination.page}&Pagination.PageSize=${this.pagination.pageSize}`

    return result
  }
}
