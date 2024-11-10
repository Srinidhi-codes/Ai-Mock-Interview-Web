'use client';
import { Button } from '@/components/ui/button';
import { gql, useLazyQuery } from '@apollo/client';
import { Lightbulb, VideoOff } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const QUERY_MOCK_INTERVIEW = gql`
    query MockInterview($mockId: String!) {
        mockInterview(mockId: $mockId) {
            jobPosition
            jobDesc
            jobExperience
            mockId
        }
    }
`;

function InterviewPage({ params }) {
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [jobData, setJobData] = useState({});
    const [fetchMockInterview, { data, loading, error }] = useLazyQuery(QUERY_MOCK_INTERVIEW);
    const { interviewId } = React.use(params);

    useEffect(() => {
        if (interviewId) {
            fetchMockInterview({ variables: { mockId: interviewId } });
        }
    }, [interviewId, fetchMockInterview]);

    useEffect(() => {
        if (data) {
            setJobData(data.mockInterview[0]);
        }
    }, [data]);


    return (
        <div className='my-10 flex justify-center flex-col items-center'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                {data && jobData && (
                    <div className='flex flex-col gap-y-5'>
                        <div className='flex flex-col my-5 gap-3 p-5 border rounded-lg border-gray'>
                            <h2 className='text-lg'><strong>Job Role/Position: </strong>{jobData.jobPosition}</h2>
                            <h2 className='text-lg'><strong>Job Description/Tech Stack: </strong>{jobData.jobDesc}</h2>
                            <h2 className='text-lg'><strong>Years of Experience: </strong>{jobData.jobExperience}</h2>
                        </div>
                        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-50'>
                            <p className='flex gap-2 items-center text-yellow-500'><Lightbulb className='animate-pulse' /> <strong>Information</strong></p>
                            <h2 className='mt-3 text-yellow-500'>
                                Enable Video Web Cam & Microphone to Start your AI Generated Mock Interview. It has 5 questions which you can answer, and at the end, you will receive a report based on your answers.<br />
                                <strong>Note:</strong> We will never record your video; you can turn off the webcam at any time.
                            </h2>
                        </div>
                    </div>
                )}
                <div className='text-center'>
                    {webCamEnabled ? (
                        <div>
                            <Webcam
                                style={{ width: 700, height: 300 }}
                                className='my-6 rounded-lg'
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                mirrored={true}
                            />
                            <div className='flex items-center justify-center gap-2'>
                                <Link href={`/dashboard/interview/${interviewId}/start`}>
                                    <Button>Start Interview</Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            <VideoOff className='h-72 w-full my-7 p-20 bg-primary text-red-500 rounded-lg border' />
                            <div className='flex items-center justify-center gap-2'>
                                <Link href={`/dashboard/interview/${interviewId}/start`}>
                                    <Button variant="outline">Start Interview 🚀</Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InterviewPage;
