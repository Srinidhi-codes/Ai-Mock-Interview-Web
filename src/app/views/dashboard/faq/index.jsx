import React from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import Header from '../dashboard/_components/Header';

const faqs = [
    {
        question: "What is the AI-generated mock interview process?",
        answer: "The AI-generated mock interview process involves answering a series of tailored questions related to your specific job role. These questions are analyzed by Gemini AI to provide you with personalized interview scenarios that maximize your chances of success."
    },
    {
        question: "How does Gemini AI select the interview questions?",
        answer: "Gemini AI scans your responses and selects the most relevant interview questions based on your input and the job position you're targeting. This ensures that the questions you practice are specifically designed to help you prepare for your upcoming interviews."
    },
    {
        question: "What kind of feedback will I receive after my mock interview?",
        answer: "After completing your mock interview, you'll receive detailed feedback, including suggested answers, performance ratings, and areas for improvement. This comprehensive analysis helps you refine your skills and boosts your confidence for real interviews."
    },
    {
        question: "Can I revisit my interview experience later?",
        answer: "Yes! You can revisit your mock interview experience at any time. This feature allows you to track your progress, review your feedback, and continue to improve your interview skills whenever you need to."
    }
];



function Faq() {
    return (
        <>
            <Header />
            <div className='px-[10rem]'>
                <h2 className='font-bold text-xl mt-5'>Frequently Asked Question's?</h2>
                <div className='flex flex-col justify-start items-start border rounded-lg mt-10'>
                    {faqs.map((faq, idx) => <Collapsible className='w-full px-5' key={idx}>
                        <CollapsibleTrigger className='w-full flex justify-between p-2 bg-secondary rounded-lg my-5'>{faq.question} <ChevronsUpDown /></CollapsibleTrigger>
                        <CollapsibleContent className='p-2 border rounded-lg text-sm text-gary-500'>
                            {faq.answer}
                        </CollapsibleContent>
                    </Collapsible>)}

                </div>
            </div>
        </>
    )
}

export default Faq