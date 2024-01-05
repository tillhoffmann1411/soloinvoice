'use server';
import React from 'react'
import ContactTable from './ui/contact-table/contact-table';
export default async function Home() {
    return (
        <div>
            <ContactTable />
        </div>
    )
};