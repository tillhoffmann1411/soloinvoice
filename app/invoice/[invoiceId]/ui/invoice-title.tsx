import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@radix-ui/react-icons';
import { Invoice } from '@prisma/client';
import { useRouter } from 'next/navigation';

import { deleteInvoice, getInvoice } from '@/app/lib/actions/invoice';
import { Button } from '@/components/ui/button';

export default function InvoiceTitle({ invoiceId }: { invoiceId: string }) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchInvoice = async () => {
            const invoice = await getInvoice(Number(invoiceId));
            setInvoice(invoice);
        };
        fetchInvoice();
    }, [setInvoice, invoiceId]);

    const onDeleteInvoice = async () => {
        await deleteInvoice(Number(invoiceId));
        router.push('/invoice');
    };

    return (
        <div className='inline-flex pb-2 items-center gap-x-2'>
            <h1 className="text-2xl font-bold">{invoice && invoice.title}</h1>
            <Button
                variant="ghost"
                onClick={onDeleteInvoice}
            >
                <TrashIcon className="text-red-600" />
            </Button>
        </div>
    )
}
