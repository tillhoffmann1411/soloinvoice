'use client';
import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getContacts } from '@/app/lib/actions/contact';
import { Button } from '@/components/ui/button';
import { Contact } from '@prisma/client';

export default function ChangeContact() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const fetchContacts = async () => {
            const contacts = await getContacts();
            setContacts(contacts);
        };
        fetchContacts();
    }, [setContacts]);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant='outline'>Change</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Your contacts</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {contacts.map(contact => (
                        <DropdownMenuItem key={contact.id}>{contact.name}</DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
