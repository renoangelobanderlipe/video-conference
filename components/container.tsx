"use client"

import React from 'react'

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="flex size-full flex-col gap-5 text-white">
            {children}
        </section>
    )
}

export default Container
