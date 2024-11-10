'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {
    const path = usePathname();
    useEffect(() => {

    }, []);
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Link href={'/dashboard'}>
                <Image src={'/logo.svg'} width={80} height={100} alt='logo' />
            </Link>
            <ul className='hidden md:flex gap-6 cursor-pointer'>
                <Link href={'/dashboard'} className={`${path === '/dashboard' && 'text-primary font-bold'} hover:text-primary transition-all`}>Dashboard</Link>
                <Link href={'/dashboard/faq'} className={`${path === '/dashboard/faq' && 'text-primary font-bold'} hover:text-primary transition-all`}>Question's</Link>
                <Link href={'/dashboard/about'} className={`${path === '/dashboard/about' && 'text-primary font-bold'} hover:text-primary transition-all`}>About</Link>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header