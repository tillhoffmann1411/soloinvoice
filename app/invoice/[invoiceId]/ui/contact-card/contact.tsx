'use client';
import React, { useEffect, useState } from 'react'

import { getContactForInvoice } from '@/app/lib/actions/contact'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PersonIcon } from '@radix-ui/react-icons';
import ChangeContact from './change-contact';
import { Contact } from '@prisma/client';

type Props = {
    invoiceId: string
};

export default function Contact({ invoiceId }: Props) {
    const [contact, setContact] = useState<Contact | null>(null);

    useEffect(() => {
        const fetchContact = async () => {
            const contact = await getContactForInvoice(Number(invoiceId));
            setContact(contact);
        };
        fetchContact();
    }, [setContact, invoiceId]);

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Client</CardTitle>
            </CardHeader>
            <CardContent>
                {contact && (
                    <div className='flex justify-between gap-x-6'>
                        <div className="flex min-w-0 gap-x-4">
                            <Avatar className="h-12 w-12">
                                <AvatarFallback>
                                    <PersonIcon className="w-8 h-8 text-gray-500" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">{contact.name}</p>
                                <p className="mt-1 truncate text-sm leading-5 text-gray-500">{contact.zipcode + ' ' + contact.city}</p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900 dark:text-gray-100">{contact.email}</p>
                                <p className="mt-1 truncate text-sm leading-5 text-gray-500">{contact.street}</p>
                            </div>
                            <ChangeContact />
                        </div>
                    </div>
                )}

            </CardContent>
            <CardFooter className="flex justify-end text-xs text-gray-500">
                <span>last updated at: {contact && contact.updatedAt.toDateString()}</span>
            </CardFooter>
        </Card>
    )
}
