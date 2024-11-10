import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({ mockInterviewQue, activeQueIndex }) {
    const textToSpeach = (text) => {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry your browser doesnt support text to speech feature.')
        }
    }
    console.log(mockInterviewQue,"TEST")
    return mockInterviewQue && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {mockInterviewQue?.map((_, index) => (
                    <p className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQueIndex === index ? 'bg-blue-500 text-secondary' : 'bg-secondary text-primary'}`} key={index}>Question #{index + 1}</p>
                ))}
            </div>
            <p className='my-5 text-md md:text-lg'>{mockInterviewQue[activeQueIndex]?.question}</p>
            <Volume2 className='cursor-pointer' onClick={() => textToSpeach(mockInterviewQue[activeQueIndex]?.question)} />
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <div className='flex gap-2 items-center text-blue-700'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </div>
                <p className='my-2 text-sm text-blue-700'>Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer.</p>
            </div>
        </div>
    )
}

export default QuestionsSection