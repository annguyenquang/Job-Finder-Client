import { Pagination } from '@/models/common/Pagination'
import { Metadata } from './Metadata'
import { metadata } from '../../../app/(protected)/layout'
import { QueryParams } from '@/models/enum/MetadataValue'

export class JobApplicationParam {
  jobId: string
  pagination: Pagination
  FromDate: string
  ToDate: string

  constructor() {
    this.jobId = ''
    this.pagination = { page: 1, pageSize: 9 }
    this.FromDate = ''
    this.ToDate = ''
  }

  setJobId(id: string): void {
    this.jobId = id
  }

  setPage(newPage: number): void {
    this.pagination.page = newPage
  }

  setFromDate(newDate: string): void {
    this.FromDate = newDate
  }

  setToDate(newDate: string): void {
    this.ToDate = newDate
  }

  constructParam(): string {
    let result = ''
    //Construct jobId
    if (this.jobId) result += `Filter.JobId=${this.jobId}`
    //Construct pagination
    result += `&Pagination.Page=${this.pagination.page}&Pagination.PageSize=${this.pagination.pageSize}`

    //Construct Fromdate
    if (this.FromDate) result += `&Filter.FromDate=${this.FromDate}`

    //Construct ToDate
    if (this.ToDate) result += `&Filter.ToDate=${this.ToDate}`

    return result
  }
}
