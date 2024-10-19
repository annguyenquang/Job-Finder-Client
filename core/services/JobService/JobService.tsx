import { JobStatus, type CompanyDetail, type Job } from '@/models'
import { http } from '../http'

type JobResponse = {
  jobs: Job[] // Chỉnh sửa để trả về mảng các Job
}

const fakeJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    salary: 15, // Lương: 15 triệu VNĐ
    location: 'Hà Nội', // Vị trí: Hà Nội
    status: JobStatus.Open,
    description: 'Phát triển các thành phần giao diện người dùng cho ứng dụng web.',
    ownerId: '1',
    closeDate: '31-12-2024'
  },
  {
    id: '2',
    title: 'Backend Developer',
    salary: 18, // Lương: 18 triệu VNĐ
    location: 'TP. Hồ Chí Minh', // Vị trí: TP. Hồ Chí Minh
    status: JobStatus.Open,
    description: 'Xử lý logic phía server và tương tác với cơ sở dữ liệu.',
    ownerId: '1',
    closeDate: '30-11-2024'
  },
  {
    id: '3',
    title: 'Data Scientist',
    salary: 25, // Lương: 25 triệu VNĐ
    location: 'Đà Nẵng', // Vị trí: Đà Nẵng
    status: JobStatus.Close,
    description: 'Phân tích và diễn giải dữ liệu phức tạp để đưa ra quyết định.',
    ownerId: '1',
    closeDate: '30-11-2024'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    salary: 20, // Lương: 20 triệu VNĐ
    location: 'Hải Phòng', // Vị trí: Hải Phòng
    status: JobStatus.Open,
    description: 'Đảm bảo tích hợp và triển khai liên tục trong quy trình phát triển phần mềm.',
    ownerId: '1',
    closeDate: '30-11-2024'
  },
  {
    id: '5',
    title: 'Product Manager',
    salary: 30, // Lương: 30 triệu VNĐ
    location: 'Bình Dương', // Vị trí: Bình Dương
    status: JobStatus.Open,
    description: 'Quản lý phát triển và phát hành sản phẩm, đảm bảo phù hợp với chiến lược kinh doanh.',
    ownerId: '1',
    closeDate: '30-11-2024'
  },
  {
    id: '6',
    title: 'Frontend Developer',
    salary: 15, // Lương: 15 triệu VNĐ
    location: 'Hà Nội', // Vị trí: Hà Nội
    status: JobStatus.Open,
    description: 'Phát triển các thành phần giao diện người dùng cho ứng dụng web.',
    ownerId: '1',
    closeDate: '31-12-2024'
  },
  {
    id: '7',
    title: 'Backend Developer',
    salary: 18, // Lương: 18 triệu VNĐ
    location: 'TP. Hồ Chí Minh', // Vị trí: TP. Hồ Chí Minh
    status: JobStatus.Open,
    description: 'Xử lý logic phía server và tương tác với cơ sở dữ liệu.',
    ownerId: '1',
    closeDate: '30-11-2024'
  },
  {
    id: '8',
    title: 'Data Scientist',
    salary: 25, // Lương: 25 triệu VNĐ
    location: 'Đà Nẵng', // Vị trí: Đà Nẵng
    status: JobStatus.Close,
    description: 'Phân tích và diễn giải dữ liệu phức tạp để đưa ra quyết định.',
    ownerId: '1',
    closeDate: '30-11-2024'
  },
  {
    id: '9',
    title: 'DevOps Engineer',
    salary: 20, // Lương: 20 triệu VNĐ
    location: 'Hải Phòng', // Vị trí: Hải Phòng
    status: JobStatus.Open,
    description: 'Đảm bảo tích hợp và triển khai liên tục trong quy trình phát triển phần mềm.',
    ownerId: '1',
    closeDate: '30-11-2024'
  },
  {
    id: '10',
    title: 'Product Manager',
    salary: 30, // Lương: 30 triệu VNĐ
    location: 'Bình Dương', // Vị trí: Bình Dương
    status: JobStatus.Open,
    description: 'Quản lý phát triển và phát hành sản phẩm, đảm bảo phù hợp với chiến lược kinh doanh.',
    ownerId: '1',
    closeDate: '30-11-2024'
  }
]

const getJobs = async () => {
  return fakeJobs
}

const getJobsByCompanyId = async (ownerId: string): Promise<JobResponse | undefined> => {
  try {
    // Sử dụng filter để lấy tất cả jobs của ownerId
    const jobs = fakeJobs.filter((j) => j.ownerId === ownerId)
    if (jobs.length === 0) {
      console.log('Jobs not found')
    }
    return { jobs } // Trả về mảng jobs
  } catch (error) {
    console.log(error)
    return undefined // Hoặc có thể xử lý lỗi theo cách khác
  }
}

export const JobService = { getJobsByCompanyId, getJobs }
