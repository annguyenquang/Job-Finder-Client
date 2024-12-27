import { Pagination } from '@/models/common/Pagination'

export class CompanyParam {
  pagination: Pagination
  provinceId: number | null
  query: string

  constructor() {
    this.pagination = { page: 1, pageSize: 6 }
    this.query = ''
    this.provinceId = null
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

    //Construct query
    if (this.query) result += `Filter.Keyword=${this.query}`

    //Construct pagination
    result += `&Pagination.Page=${this.pagination.page}&Pagination.PageSize=${this.pagination.pageSize}`

    //Construct provinceID
    if (this.provinceId != null) result += `&Filter.ProvinceId=${this.provinceId}`

    return result
  }
}
