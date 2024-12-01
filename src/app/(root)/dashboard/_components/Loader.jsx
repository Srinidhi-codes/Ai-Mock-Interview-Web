import { Loader2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'

// Predefined messages to show while loading
const messages = [
    { data: "Fetching data for you please wait.!" },
    { data: "We're using free instance 🥺 so it might take a few seconds to a minute to load." },
    { data: "Hold on, we’re preparing something awesome!" },
    { data: "Patience, please! Great things take time!" },
    { data: "Almost there... just a few seconds!" },
]

const Loader = () => {
    const [currentMessage, setCurrentMessage] = useState(messages[0].data);

    useEffect(() => {
        const messageIndex = Math.floor(Math.random() * messages.length);
        setCurrentMessage(messages[messageIndex].data);

        const timeoutId = setTimeout(() => {
            setCurrentMessage(messages[(messageIndex + 1) % messages.length].data);
        }, 5000); // Change message every 5 seconds

        return () => clearTimeout(timeoutId);
    }, [currentMessage]);

    return (
        <div className='flex flex-col justify-center items-center'>
            <Loader2 size={50} className='text-[5rem] font-bold animate-spin transition-all' />
            <h1 className='text-[1.5rem] font-semibold'>{currentMessage}</h1>
        </div>
    );
}

export default Loader;
