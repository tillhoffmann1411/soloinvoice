'use server';
import { Suspense } from 'react';
import { getInvoices } from '../../lib/actions';
import InvoiceListItem from './invoice-list-item';
import InvoiceSkeleton from './invoice-skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default async function InvoiceSelector() {
    const invoices = await getInvoices();

    return (
        <ul>
            <Link href={`/invoice/`}>
                <li
                    className="flex justify-between gap-x-6 rounded-lg p-2 cursor-pointer border border-transparent hover:border-inherit hover:shadow-sm"
                >
                    <div className="flex min-w-0 gap-x-4">
                        <div className="flex-none p-2">
                            <Avatar>
                                <AvatarFallback>
                                    <PlusCircledIcon className="w-6 h-6 text-gray-500 font-bold" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="min-w-0 flex-auto self-center">
                            <p className="text-sm font-semibold">+ New Invoice</p>
                        </div>
                    </div>
                </li >
            </Link>
            <Separator className='my-2' />
            <Suspense fallback={<InvoiceSkeleton />}>
                {invoices.map((invoice) => (
                    <InvoiceListItem key={invoice.id} invoice={invoice} />
                ))}
            </Suspense>
        </ul>
    );
}