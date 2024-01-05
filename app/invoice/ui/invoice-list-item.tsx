'use server';
import { Invoice } from '@prisma/client';
import { FileIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { getContactForInvoice } from '../../lib/actions/contact';

type Props = {
    invoice: Invoice;
};

export default async function InvoiceListItem({ invoice }: Props) {
    const contact = await getContactForInvoice(invoice.id);

    return (
        <Link href={`/invoice/${invoice.id}`}>
            <li
                key={invoice.id}
                className="flex justify-between gap-x-6 rounded-lg p-2 cursor-pointer border border-transparent hover:border-inherit hover:shadow-sm"
            >
                <div className="flex min-w-0 gap-x-2">
                    <div className="flex-none p-2">
                        <Avatar>
                            <AvatarFallback>
                                <FileIcon className="w-5 h-5 text-gray-500" />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6">{`${invoice.title} (${invoice.date.toLocaleDateString()})`}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{contact && contact.name}</p>
                    </div>
                </div>
            </li >
        </Link>
    )
}