'use client';
import React, { useEffect, useState } from 'react'
import { DataTable } from '@/components/ui/data-table'
import { getContacts } from '@/app/lib/actions/contact'
import { contactColumns } from './contact-columns';
import { Contact } from '@prisma/client';

export default function ContactTable() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const columns = contactColumns;

    useEffect(() => {
        getContacts().then((contacts) => {
            setContacts(contacts);
        })
    }, [setContacts]);

    return (<DataTable columns={columns} data={contacts} hiddenColumns={['id', 'createdAt', 'updatedAt']} />);
}
