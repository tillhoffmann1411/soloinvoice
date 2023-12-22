'use client';
import React from 'react'
import InvoiceSelector from './ui/invoice-selector';
import AddInvoice from './ui/add-invoice';

export default function Home() {
    return (
        <main className="flex items-center flex-col-reverse gap-y-8 p-2 lg:flex-row lg:justify-around lg:items-start">
            <div className="w-full md:max-w-md">
                <h1 className="text-2xl font-bold pb-2">
                    Select an invoice
                </h1>
                <InvoiceSelector />
            </div>
            <div className="w-full md:max-w-md">
                <h1 className="text-2xl font-bold pb-2">
                    Add new invoice
                </h1>
                <AddInvoice />
            </div>
        </main>
    )
};