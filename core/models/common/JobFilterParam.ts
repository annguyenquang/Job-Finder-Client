import { Pagination } from '@/models/common/Pagination'
import { Metadata } from './Metadata'
import { metadata } from '../../../app/layout'
import { QueryParams } from '@/models/enum/MetadataValue'

export class JobParam {
  pagination: Pagination
  metadata?: Metadata[] | undefined
  provinceId?: number

  constructor() {
    this.pagination = { page: 1, pageSize: 6 }
  }

  setFilter(newFilter: Metadata[] | undefined): void {
    this.metadata = newFilter
  }

  setProvinceId(newProvinceId: number): void {
    this.provinceId = newProvinceId
  }

  constructParam(): string {
    let result = ''
    //Construct pagination
    result += `Pagination.Page=${this.pagination.page}&Pagination.PageSize=${this.pagination.pageSize}`

    //Construct metadata
    this.metadata?.forEach((item) => {
      const queryParam = QueryParams[item.type]
      if (queryParam) {
        result += `&${queryParam}=${item.id}`
      }
    })

    //Construct provinceID
    if (this.provinceId != undefined) result += `&JobFilter.ProvinceId=${this.provinceId}`

    return result
  }
}
