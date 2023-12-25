import React from 'react'
import AddInvoice from './ui/add-invoice';

export default function Home() {
    return (
        <div>
            <h1 className="text-2xl font-bold pb-2">
                Add new invoice
            </h1>
            <AddInvoice />
        </div>
    )
};