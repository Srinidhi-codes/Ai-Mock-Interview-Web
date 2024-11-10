import AddNewInterview from '@/app/(root)/dashboard/_components/AddNewInterview'
import InterviewList from '@/app/(root)/dashboard/interview/[interviewId]/start/_components/InterviewList'
import React from 'react'


function DashboardPage() {
    return (
        <div className='p-10'>
            <h2 className='text-gray-500 font-bold text-xl'>Create and start your AI Mock Interview</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
                <AddNewInterview />
            </div>
            <div>
                <InterviewList />
            </div>
        </div>
    )
}

export default DashboardPage