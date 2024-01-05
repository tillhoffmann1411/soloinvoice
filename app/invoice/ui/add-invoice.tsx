'use client';
import { Contact, Invoice } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addInvoice } from '@/app/lib/actions/invoice';
import { getContacts } from '@/app/lib/actions/contact';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/ui/select';

const initialState: Invoice = {
    id: 0,
    userId: 0,
    contactId: 0,
    title: '',
    invoiceNo: '',
    date: new Date(),
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
};

type Props = {
    onCreate?: (invoice: Invoice) => void;
}

export default function AddInvoice({ onCreate }: Props) {
    const [error, setError] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        (async () => {
            const cntcts = await getContacts();
            setContacts(cntcts);
        })();
    }, [setContacts]);

    const onSubmit = async (formData: FormData) => {
        const title = formData.get('title') as string;
        const userId = 1
        const data = {
            ...initialState,
            title,
            userId,
        };

        try {
            const res = await addInvoice(data);
            if (res.status === 'error') {
                setError(res.message);
                return;
            }
            formRef.current?.reset();
            onCreate && onCreate(res.invoice);
            router.push(`/invoice/${res.invoice.id}`);
            setError('');
        } catch (error: any) {
            setError(error.message);
        }
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Invoice</CardTitle>
                <CardDescription>Create a new invoice by setting a title and contact.</CardDescription>
            </CardHeader>
            <form action={onSubmit} ref={formRef}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="Title of the invoice" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="contact">Contact</Label>
                            <Select name="contact">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a contact" />
                                </SelectTrigger>
                                <SelectContent>
                                    {contacts.map((contact) => (
                                        <SelectItem key={contact.id} value={contact.id.toString()}>{contact.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button variant="outline" type="submit">Add Invoice</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
