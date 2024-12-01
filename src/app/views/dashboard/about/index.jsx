import Header from '@/app/(root)/dashboard/_components/Header'
import Image from 'next/image'
import React from 'react'

function AboutPage() {
  return (
    <>
    <Header />
    <div className='flex justify-around gap-5'>
      <div className='w-[40%] ml-[-10%]'>
        <Image src={'/about.png'} width={400} height={100} alt='about' />
      </div>
      <div className='w-[60%] m-auto'>
        <p className='font-bold text-3xl'>This is an <span className='text-blue-500 underline underline-offset-2'>AI Generated Mock Interview..!</span></p>
        <p className='my-4 font-medium text-lg text-gray-500'>The interview process includes inputing few questions related to interview which further being scanner through Gemini AI for handpicked interview question which best suits for you to crack your next interview.<br /> We also offer you with correct answers and feedback with rating for your complete interview process which you can re-visit anytime.</p>
      </div>
    </div>
    </>
  )
}

export default AboutPage