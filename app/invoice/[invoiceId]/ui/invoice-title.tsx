import React, { Suspense } from 'react'
import { getInvoice } from '@/app/lib/actions/invoice';
import { Skeleton } from '@/components/ui/skeleton';
import OptionsButton from './positions/options-button';

export default async function InvoiceTitle({ invoiceId }: { invoiceId: string }) {
    const invoice = await getInvoice(Number(invoiceId))

    return (
        <div className='inline-flex pb-2 items-center gap-x-2'>
            <Suspense fallback={<Skeleton className="h-4 w-[250px] my-2" />}>
                <h1 className="text-2xl font-bold">{invoice?.title}</h1>
            </Suspense>
            <OptionsButton invoiceId={invoiceId} />
        </div>
    )
}
