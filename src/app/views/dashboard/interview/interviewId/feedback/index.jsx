'use client'
import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Star } from 'lucide-react';
import Image from 'next/image';


const QUERY_MOCK_INTERVIEW_FEEDBACK = gql`
    query MockInterviewFeedback($mockId: String!) {
        mockInterviewFeedback(mockId: $mockId) {
            id
            mockIdRef
            question
            correctAnswer
            userAnswer
            feedback
            rating
            userEmail
        }
    }
`;

function FeedbackPage({ params }) {
    const { interviewId } = React.use(params);
    const [feedbackList, setFeedbackList] = useState([]);
    const [fetchMockInterviewFeedback, { data, loading, error }] = useLazyQuery(QUERY_MOCK_INTERVIEW_FEEDBACK);

    useEffect(() => {
        if (interviewId) {
            fetchMockInterviewFeedback({ variables: { mockId: interviewId } });
        }
    }, [interviewId, fetchMockInterviewFeedback]);

    useEffect(() => {
        if (data) {
            setFeedbackList(data.mockInterviewFeedback || []);
        }
    }, [data]);


    return (
        <div className='p-10'>
            {feedbackList.length == 0 ?
                <div className='w-full flex flex-col items-center'>
                    <h2 className='text-center font-bold text-xl text-gray-500'>No Feedback Record Found!</h2>
                    <Image src={"/comeback.png"} width={500} height={600} alt="Feedback Not Found" />
                </div> :
                <>
                    <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
                    <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
                    <h2 className='text-blue-500 text-lg my-3'>Your overall rating 1/10</h2>
                    <h2 className='text-sm text-gray-500'>Find below interview question with answer & feedback tailored for you.</h2>
                    {feedbackList && feedbackList?.map((item, index) => (
                        <Collapsible key={index}>
                            <CollapsibleTrigger className='flex justify-between p-2 bg-secondary rounded-lg text-left my-5'>{`${index + 1})`} {item.question} <ChevronsUpDown /></CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-red-500 p-2 border rounded-lg flex gap-2'><strong>Rating:</strong>{Array.from({ length: item.rating }, (_, index) => (
                                        <Star key={index} />
                                    ))}</div>
                                    <div className='p-2 border roundedlg bg-blue-50 text-sm text-blue-500'><strong>Your Answer: </strong>{item.userAnswer}</div>
                                    <div className='p-2 border roundedlg bg-green-50 text-sm text-green-500'><strong>Correct Answer: </strong>{item.correctAnswer}</div>
                                    <div className='p-2 border roundedlg bg-gray-50 text-sm text-gray-500'><strong>Feedback: </strong>{item.feedback}</div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                    ))}
                </>
            }
        </div>
    )
}

export default FeedbackPage