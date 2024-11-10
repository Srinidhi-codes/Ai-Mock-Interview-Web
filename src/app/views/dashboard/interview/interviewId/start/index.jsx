'use client'
import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import QuestionsSection from '@/app/(root)/dashboard/interview/[interviewId]/start/_components/QuestionsSection';
import RecordAnsSection from '@/app/(root)/dashboard/interview/[interviewId]/start/_components/RecordAnsSection';

const QUERY_MOCK_INTERVIEW = gql`
    query MockInterview($mockId: String!) {
        mockInterview(mockId: $mockId) {
            jsonMockResp
            jobPosition
            jobDesc
            jobExperience
            mockId
        }
    }
`;


function StartInterviewPage({ params }) {
    const [activeQueIndex, setActiveQueIndex] = useState(0);
    const [fetchMockInterview, { data, loading, error }] = useLazyQuery(QUERY_MOCK_INTERVIEW);
    const { interviewId } = React.use(params);
    let jsonMockResp;

    useEffect(() => {
        if (interviewId) {
            fetchMockInterview({ variables: { mockId: interviewId } });
        }
    }, [interviewId, fetchMockInterview]);

    if (data?.mockInterview) {
        jsonMockResp = JSON.parse(data?.mockInterview[0]?.jsonMockResp);
    }
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <QuestionsSection mockInterviewQue={jsonMockResp} activeQueIndex={activeQueIndex} />
                <div className='flex flex-col gap-2'>
                    <RecordAnsSection mockInterviewQue={jsonMockResp} activeQueIndex={activeQueIndex} interviewId={interviewId} />
                    <div className='flex justify-end gap-2'>
                        {activeQueIndex > 0 && <Button onClick={() => setActiveQueIndex(activeQueIndex - 1)}><ChevronsLeft />Previous Question</Button>}
                        {activeQueIndex != process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT - 1 && <Button onClick={() => setActiveQueIndex(activeQueIndex + 1)}><ChevronsRight />Next Question</Button>}
                        {activeQueIndex == process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT - 1 &&
                            <Link href={`/dashboard/interview/${data?.mockInterview?.mockId}/feedback`} >
                                <Button> End Interview</Button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StartInterviewPage