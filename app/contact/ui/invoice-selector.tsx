'use server';
import { Suspense } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import ContactListItem from './contact-list-item';
import { getContacts } from '@/app/lib/actions/contact';

export default async function ContactSelector() {
    const contacts = await getContacts();

    return (
        <ul>
            <Link href={`/contact/`}>
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
            <Suspense fallback={<div>Loading... </div>}>
                {contacts.map((contact) => (
                    <ContactListItem key={contact.id} contact={contact} />
                ))}
            </Suspense>
        </ul>
    );
}