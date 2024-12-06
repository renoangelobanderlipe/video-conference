"use client"

import { useGetCallById } from '@/app/hooks/useGetCallById';
import Loader from '@/components/loader';
import MeetingRoom from '@/components/meeting-room';
import MeetingSetup from '@/components/meeting-setup';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

const MeetingPage = ({ params: { id } }: { params: { id: string } }) => {
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { user, isLoaded } = useUser();
    const { call, isCallLoading } = useGetCallById(id);

    if (!isLoaded || isCallLoading) return <Loader />
    return (
        <main className='h-screen w-full'>
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete
                        ? <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                        : <MeetingRoom />}
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default MeetingPage
