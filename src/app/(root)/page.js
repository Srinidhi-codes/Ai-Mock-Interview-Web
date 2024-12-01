import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Card from "./dashboard/_components/Card";
import Header from "./dashboard/_components/Header";

const data = [
  {
    user: "John",
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    likes: 22,
    question: "What is the AI-generated mock interview process?",
    answer: "The AI-generated mock interview process involves answering a series of tailored questions related to your specific job role. These questions are analyzed by Gemini AI to provide you with personalized interview scenarios that maximize your chances of success."
  },
  {
    user: "Srii",
    img: "https://www.shutterstock.com/image-photo/handsome-indian-young-man-posing-260nw-2440478803.jpg",
    likes: 28,
    question: "How does Gemini AI select the interview questions?",
    answer: "Gemini AI scans your responses and selects the most relevant interview questions based on your input and the job position you're targeting. This ensures that the questions you practice are specifically designed to help you prepare for your upcoming interviews."
  },
  {
    user: "Sandhya",
    img: "https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHx8MA%3D%3D",
    likes: 33,
    question: "Can I revisit my interview experience later?",
    answer: "Yes! You can revisit your mock interview experience at any time. This feature allows you to track your progress, review your feedback, and continue to improve your interview skills whenever you need to."
  }
];

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex justify-between px-10 py-8 rounded-md w-[80vw] h-[15rem] border mt-[5rem] hover:shadow-lg transition-all">
          <div>
            <h1 className="text-[2rem] font-bold">Get Your Interview Prep's With <span className="text-blue-500 animate-pulse delay-300 transition-all">AI</span></h1>
            <h1 className="text-md font-medium">Made with Gemini AI.</h1>
            <div className="flex gap-4 py-5">
              <Link href={'/dashboard'}>
                <Button>Get Prepared</Button>
              </Link>
              <Link className="flex gap-2 items-center hover:translate-x-2 transition-all" href={'/about'}>
                <Button variant="ghost">Know More</Button><ArrowRight />
              </Link>
            </div>
          </div>
          <div className="h-[15rem]">
            <Image src={"/banner.png"} alt="Banner" width={350} height={150} className="w-[300px] h-[17rem] mt-[-5rem]" />
          </div>
        </div>
        <div className="w-[75vw] mt-[5rem]">
          <Card data={data} />
        </div>
      </div>
    </>
  );
}
