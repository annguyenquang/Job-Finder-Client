import { Pagination } from '@/models/common/Pagination'

export class JobApplicationParam {
  jobId: string
  pagination: Pagination
  fromDate: string
  toDate: string
  state: number | null

  constructor() {
    this.jobId = ''
    this.pagination = { page: 1, pageSize: 4 }
    this.fromDate = ''
    this.toDate = ''
    this.state = null
  }

  setJobId(id: string): void {
    this.jobId = id
  }

  setState(newState: number | null) {
    this.state = newState
  }

  setPage(newPage: number): void {
    this.pagination.page = newPage
  }

  setFromDate(newDate: string): void {
    this.fromDate = newDate
  }

  setToDate(newDate: string): void {
    this.toDate = newDate
  }

  constructParam(): string {
    let result = ''
    //Construct jobId
    if (this.jobId) result += `Filter.JobId=${this.jobId}`
    //Construct pagination
    result += `&Pagination.Page=${this.pagination.page}&Pagination.PageSize=${this.pagination.pageSize}`

    //Construct fromDate
    if (this.fromDate) result += `&Filter.FromDate=${this.fromDate}`

    //Construct toDate
    if (this.toDate) result += `&Filter.ToDate=${this.toDate}`

    if (this.state != null) result += `&Filter.State=${this.state}`

    return result
  }
}
