'use client';
import { chatSession } from '@/app/utils/GeminiAI';
import { Button } from '@/components/ui/button';
import { gql, useMutation } from '@apollo/client';
import { useUser } from '@clerk/nextjs';
import { CircleStop, Mic, MicOff, Video, VideoOff, WebcamIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { toast } from 'sonner';


const CREATE_MOCK_INTERVIEW_FEEDBACK = gql`
    mutation CreateMockInterviewFeedback($input: MockInterviewFeedbackInput!){
        createMockInterviewFeedback(input: $input){
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

function RecordAnsSection({ mockInterviewQue, activeQueIndex, interviewId }) {
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [createMockInterviewFeedback] = useMutation(CREATE_MOCK_INTERVIEW_FEEDBACK);
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (
            setUserAnswer(result.transcript)
        ))
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer();
        }
    }, [userAnswer]);

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    }

    const UpdateUserAnswer = async () => {
        setLoading(true);
        const feedbackPrompt = `Question: ${mockInterviewQue[activeQueIndex]?.question}, User Answer: ${userAnswer}. Depending on question and user answer for for given interview question please give rating out of 10 for answer and feedback as area of improvement in just 3 tot 5 lines in JSON format with rating feild and feedback field.`
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
        const JsonFeedbackResp = JSON.parse(mockJsonResp);
        try {
            await createMockInterviewFeedback({
                variables: {
                    input: {
                        mockIdRef: interviewId,
                        question: mockInterviewQue[activeQueIndex].question,
                        correctAnswer: mockInterviewQue[activeQueIndex].answer,
                        userAnswer: userAnswer,
                        feedback: JsonFeedbackResp.feedback,
                        rating: JsonFeedbackResp.rating,
                        userEmail: user.primaryEmailAddress.emailAddress,
                    }
                }
            })
            toast('Answer recorded successfully!');
            setResults([]);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=''>
            <div className='text-center flex flex-col justify-center items-center bg-black rounded-lg p-5 my-20'>
                {webCamEnabled ? (
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Webcam
                            style={{ width: '100%', height: '300px', zIndex: 10 }}
                            mirrored={true}
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                        />
                        <div className='flex gap-5 items-center '>
                            <Button className="bg-white hover:bg-white/80" onClick={() => setWebCamEnabled(false)}>
                                <Video className='text-green-600 my-7' />
                            </Button>
                            <Button disabled={loading} onClick={StartStopRecording} className="my-10" variant="outline">
                                {isRecording ?
                                    <>
                                        <CircleStop className='text-red-600 animate-pulse' /> Stop Recording...
                                    </>
                                    :
                                    <>
                                        <MicOff className='text-red-600' /> Start Record
                                    </>}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Image
                            className='opacity-70'
                            src={'/webcam-icon.png'}
                            alt="web cam"
                            height={300}
                            width={300}
                        />
                        <div className='flex gap-5'>
                            <Button className="bg-white hover:bg-white/80" onClick={() => setWebCamEnabled(true)}>
                                <VideoOff className='text-red-600' />
                            </Button>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecordAnsSection;
