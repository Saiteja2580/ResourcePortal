import React from 'react'
import { columns } from './columns'
import { DataTable } from '@/components/BookingTable'

const BookingPage = () => {
  return (
    <div className='p-5'>
      <DataTable columns={columns} data={[]}/>
    </div>
  )
}

export default BookingPage