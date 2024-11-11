import { Pagination } from '@/models/common/Pagination'
import { Metadata } from './Metadata'
import { metadata } from '../../../app/layout'
import { QueryParams } from '@/models/enum/MetadataValue'

export class JobParam {
  pagination: Pagination
  metadata?: Metadata[] | undefined
  status: number
  provinceId: number | null
  query: string

  constructor() {
    this.pagination = { page: 1, pageSize: 6 }
    this.status = 1
    this.query = ''
    this.provinceId = null
  }

  setFilter(newFilter: Metadata[] | undefined): void {
    this.metadata = newFilter
  }

  setStatus(newStatus: number): void {
    this.status = newStatus
  }

  setProvinceId(newProvinceId: number | null): void {
    this.provinceId = newProvinceId
  }

  setPage(newPage: number): void {
    this.pagination.page = newPage
  }

  setQuery(newQuery: string) {
    this.query = newQuery
  }

  constructParam(): string {
    let result = ''

    //Construct status
    result += `JobFilter.Status=${this.status}`

    //Construct query
    if (this.query) result += `&JobFilter.Keyword=${this.query}`

    //Construct pagination
    result += `&Pagination.Page=${this.pagination.page}&Pagination.PageSize=${this.pagination.pageSize}`

    //Construct metadata
    this.metadata?.forEach((item) => {
      const queryParam = QueryParams[item.type]
      if (queryParam) {
        result += `&${queryParam}=${item.id}`
      }
    })

    //Construct provinceID
    if (this.provinceId != null) result += `&JobFilter.ProvinceId=${this.provinceId}`

    return result
  }
}
