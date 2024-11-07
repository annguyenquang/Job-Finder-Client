import { Pagination } from "../common/Pagination"

export type ListResult<T> = {
    pagination: Pagination,
    data: T,
    total: number
}