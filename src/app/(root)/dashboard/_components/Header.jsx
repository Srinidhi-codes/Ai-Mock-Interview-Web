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
            <Link href={'/'}>
                <Image src={'/logo.png'} width={80} height={100} alt='logo' />
            </Link>
            {user && <ul className='hidden md:flex gap-6 cursor-pointer'>
                <Link href={'/dashboard'} className={`${path === '/dashboard' && 'text-primary font-bold'} hover:text-primary transition-all`}>Dashboard</Link>
                <Link href={'/dashboard/faq'} className={`${path === '/dashboard/faq' && 'text-primary font-bold'} hover:text-primary transition-all`}>Question's</Link>
                <Link href={'/about'} className={`${path === '/dashboard/about' && 'text-primary font-bold'} hover:text-primary transition-all`}>About</Link>
            </ul>}
            <UserButton />
            {!user && <Link href="/dashboard">
                <Button variant="outline" className="flex justify-end items-end hover:underline hover:transition-all hover:delay-500">Try Now</Button>
            </Link>}
        </div>
    )
}

export default Header