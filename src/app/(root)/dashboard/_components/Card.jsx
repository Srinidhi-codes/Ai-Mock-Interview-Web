import { ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Card = ({ data }) => {
    return (
        <Link href={'/faq'} className='flex gap-2 lg:flex-row flex-col'>
            {data?.map((item) => <article className="rounded-xl border-2 w-full border-gray-100 bg-white">
                <div className="flex w-full items-start gap-4 p-4 sm:p-6 lg:p-8">
                    <a href="#" className="block shrink-0">
                        <img
                            alt=""
                            src={item.img}
                            className="size-14 rounded-lg object-cover"
                        />
                    </a>

                    <div>
                        <h3 className="font-medium sm:text-lg">
                            <a className=""> {item.question} </a>
                        </h3>

                        <p className="line-clamp-2 text-sm text-gray-700">
                            {item.answer}
                        </p>

                        <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                            <div className="flex items-center gap-1 text-gray-500">
                                <ThumbsUp className='w-[1rem]' />

                                <p className="text-xs">{item.likes} Likes</p>
                            </div>

                            <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                            <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                                Posted by
                                <a className="font-medium underline hover:text-gray-700"> {item.user} </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <strong
                        className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                        </svg>

                        <span className="text-[10px] font-medium sm:text-xs">Trending!</span>
                    </strong>
                </div>
            </article>)}
        </Link>
    )
}

export default Card