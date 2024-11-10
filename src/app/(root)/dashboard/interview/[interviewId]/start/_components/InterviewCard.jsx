import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function InterviewCard({ interviewData }) {

    return (
        <div className='border shadow-sm rounded-lg p-3 hover:scale-80 hover:shadow-md delay-100 duration-150 transition-all'>
            <h2 className='font-bold text-blue-500'>{interviewData?.jobPosition}</h2>
            <h2 className='text-sm text-gray-500'>{interviewData.jobExperience} Years of Experience</h2>
            <div className='flex justify-between mt-2 gap-5'>
                <Link className="w-full" href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
                    <Button size="sm" variant="outline" className="w-full">Feedback</Button>
                </Link>
                <Link className="w-full" href={`/dashboard/interview/${interviewData.mockId}`}>
                    <Button className="w-full" size="sm">Start</Button>
                </Link>
            </div>
        </div>
    )
}

export default InterviewCard