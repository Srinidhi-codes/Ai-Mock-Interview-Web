'use client'
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { chatSession } from '@/app/utils/GeminiAI';
import { LoaderCircle } from 'lucide-react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';


const CREATE_MOCK_INTERVIEW = gql`
    mutation CreateMockInterview($input: MockInterviewInput!){
        createMockInterview(input: $input){
            jsonMockResp
            jobPosition
            jobDesc
            jobExperience
            mockId
        }
    }
`;


const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [mockInterviewData, setMockInterviewData] = useState({
        jobPosition: "",
        jobDesc: "",
        jobExperience: 0,
        JsonResp: [],
        createdBy: "",
        mockId: ""
    })
    const [loading, setLoading] = useState(false);
    const [createMockInterview] = useMutation(CREATE_MOCK_INTERVIEW);
    const router = useRouter();
    const { user } = useUser();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'jobExperience') {
            setMockInterviewData(prevData => ({ ...prevData, [name]: Number(value) }));
        } else {
            setMockInterviewData(prevData => ({ ...prevData, [name]: value }));
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { jobPosition, jobDesc, jobExperience } = mockInterviewData;

        const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Depending on these details, give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions & answers in JSON format.`;

        const result = await chatSession.sendMessage(InputPrompt);
        let MockJSONRes = (result.response.text()).replace('```json', '').replace('```', '');
        // jsonMockResp = JSON.parse(MockJSONRes);
        const updatedMockInterviewData = {
            ...mockInterviewData,
            JsonResp: MockJSONRes,
            mockId: uuidv4(),
            createdBy: user?.primaryEmailAddress?.emailAddress
        };
        setMockInterviewData(updatedMockInterviewData);
        try {
            await createMockInterview({
                variables: {
                    input: {
                        jsonMockResp: updatedMockInterviewData.JsonResp,
                        jobPosition,
                        jobDesc,
                        jobExperience,
                        mockId: updatedMockInterviewData.mockId,
                        createdBy: updatedMockInterviewData.createdBy
                    }
                }
            })
            router.push(`/dashboard/interview/${updatedMockInterviewData.mockId}`);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
        setOpenDialog(false);
    };




    return (
        <div>
            <div className='p-10 border bg-secondary rounded-lg hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} close={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interview.</DialogTitle>
                        <div>
                            <div>
                                <div>Add details about your job position/role, Job description and years of experience</div>
                            </div>
                            <form onSubmit={onSubmit}>
                                <div className='mt-7 my-3'>
                                    <label className='text-gray-600 text-sm'>Job Role/ Job Position</label>
                                    <Input name="jobPosition" placeholder="Ex. Full Stack Developer" required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label className='text-gray-600 text-sm'>Job Description/ Tech Stack</label>
                                    <Textarea name="jobDesc" placeholder="Ex. React, NodeJS, NextJS" required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label className='text-gray-600 text-sm'>Years of experience</label>
                                    <Input name="jobExperience" placeholder="Ex. 3" type="number" max="25" required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>{loading ? <> <LoaderCircle className='animate-spin' /> Generating from AI </> : 'Start Interview'}</Button>
                                </div>
                            </form>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview
