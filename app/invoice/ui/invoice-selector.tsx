'use client';
import { useEffect, useState } from 'react';
import { getInvoices } from '../../lib/actions';
import { Invoice } from '@prisma/client';
import InvoiceListItem from './invoice-list-item';
import { InvoiceListItemSkeleton } from './invoice-list-item-skeleton';

export default function InvoiceSelector() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInvoices = async () => {
            const invoices = await getInvoices();
            setInvoices(invoices);
        }
        loadInvoices();
        setLoading(false);
    }, [setInvoices, setLoading]);

    const onDeleteInvoice = (id: number) => {
        setInvoices(invoices.filter(invoice => invoice.id !== id));
    }

    return (
        <ul className="">
            {invoices.map((invoice) => (
                <InvoiceListItem key={invoice.id} invoice={invoice} onDelete={onDeleteInvoice} />
            ))}
            {loading &&
                <>
                    <InvoiceListItemSkeleton />
                    <InvoiceListItemSkeleton />
                </>
            }
        </ul>
    );
}