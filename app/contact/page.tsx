import React from 'react'
import AddContact from './ui/add-contact'

export default function Home() {
    return (
        <div>
            <h1 className="text-2xl font-bold pb-2">
                Create new contact
            </h1>
            <AddContact />
        </div>
    )
};