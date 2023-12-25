'use client';
import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'
import { deleteInvoice } from '../../../lib/actions'
import { useRouter } from 'next/navigation'

type Props = {
    invoiceId: string
}

export default function OptionsButton({ invoiceId }: Props) {
    const router = useRouter();
    const onDeleteInvoice = async () => {
        await deleteInvoice(Number(invoiceId));
        router.push('/invoice');
    };

    return (
        <button
            className="text-red-600 hover:text-red-900"
            onClick={onDeleteInvoice}
        >
            <TrashIcon className="w-5 h-5" />
        </button>
    )
}
