import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav className='flex justify-between items-center gap-x-1' aria-label='Pagination'>
      <button
        type='button'
        className='select-none min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:text-primary hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
        aria-label='Previous'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // Disable if on first page
      >
        <svg
          className='shrink-0 size-3.5 text-gray-800 hover:text-primary dark:text-white'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='m15 18-6-6 6-6'></path>
        </svg>
        <span aria-hidden='true' className='hidden sm:block'>
          Previous
        </span>
      </button>
      <div className='flex items-center gap-x-1'>
        <span className='min-h-[38px] min-w-[38px] flex justify-center items-center border border-primary text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10'>
          {currentPage}
        </span>
        <span className='min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-neutral-500'>
          of
        </span>
        <span className='min-h-[38px] flex justify-center items-center text-primary font-sans font-semibold py-2 px-1.5 text-sm dark:text-neutral-500'>
          {totalPages}
        </span>
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // Disable if on first page
        type='button'
        className='min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-text bg-primary focus:outline-none focus:bg-secondary disabled:opacity-50 disabled:pointer-events-none dark:text-white select-none'
      >
        <span aria-hidden='true' className='hidden sm:block'>
          Next
        </span>
        <svg
          className='shrink-0 size-3.5 text-white dark:text-white'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='m9 18 6-6-6-6'></path>
        </svg>
      </button>
    </nav>
  )
}

export default Pagination
