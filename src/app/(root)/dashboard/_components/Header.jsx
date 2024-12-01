'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button'

const Header = () => {
    const path = usePathname();
    useEffect(() => {

    }, []);

    const { user } = useUser();
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Link className='flex gap-2 items-center' href={'/'}>
                <Image className='rounded-lg' src={'/logo.png'} width={70} height={100} alt='logo' />
                <h1 className='text-[1.5rem] font-semibold'>InterPrep</h1>
            </Link>
            {user && <ul className='hidden md:flex gap-6 cursor-pointer'>
                <Link href={'/dashboard'} className={`${path === '/dashboard' && 'text-primary font-bold'} hover:text-primary transition-all`}>Dashboard</Link>
                <Link href={'/dashboard/faq'} className={`${path === '/dashboard/faq' && 'text-primary font-bold'} hover:text-primary transition-all`}>Question's</Link>
                <Link href={'/about'} className={`${path === '/dashboard/about' && 'text-primary font-bold'} hover:text-primary transition-all`}>About</Link>
            </ul>}
            <div className='flex gap-2'>
                <UserButton />
                {!user && <Link href="/dashboard">
                    <Button variant="outline" className="flex justify-end items-end hover:underline hover:transition-all hover:delay-500">Try Now</Button>
                </Link>}
            </div>
        </div>
    )
}

export default Header