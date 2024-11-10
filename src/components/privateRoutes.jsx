"use client"
import { React, useLayoutEffect } from 'react'
import { usePathname, useRouter } from "next/navigation";
import { useUser } from '@clerk/nextjs';

export default function PrivateRoutes({ Component }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useUser();

    useLayoutEffect(() => {
        if (user && pathname === "/signin") {
            router.replace("/");
        } else if (!user && pathname !== "/signin") {
            router.replace("/signin");
        }
    }, [user, pathname])

    return <Component {...props} />
}
