'use client'
import { gql, useLazyQuery } from '@apollo/client';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';
import Loader from '@/app/(root)/dashboard/_components/Loader';


const QUERY_MOCK_INTERVIEW = gql`
    query MockInterview($createdBy: String!) {
        mockInterview(createdBy: $createdBy) {
            id
            jobPosition
            jobDesc
            jobExperience
            mockId
            createdBy
            createdAt
        }
    }
`;

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [fetchMockInterview, { data, loading, error }] = useLazyQuery(QUERY_MOCK_INTERVIEW);
    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            fetchMockInterview({ variables: { createdBy: user.primaryEmailAddress.emailAddress } });
        }
    }, [fetchMockInterview, user]);

    useEffect(() => {
        if (data) {
            setInterviewList(data.mockInterview || []);
        }
    }, [data]);


    return (
        <>
            {interviewList.length ? <div>
                <h2 className='font-medium text-xl'>Previous Mock Interviews</h2>
                <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5'>
                    {interviewList && interviewList.map((interview, index) => (
                        <InterviewCard key={interview?.id} interviewData={interview} />
                    ))}
                </div>
            </div> : <Loader />}
        </>
    )
}

export default InterviewList