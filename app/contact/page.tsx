'use server';
import React from 'react'
import ContactTable from './ui/contact-table/contact-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Contacts
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-end">
                    <Link
                        href="/contact/create">
                        <Button
                            variant="outline"
                            className="flex items-center"
                        >
                            <PlusCircledIcon className="w-4 h-4 mr-2" />
                            Add Contact
                        </Button>
                    </Link>
                </div>
                <ContactTable />
            </CardContent>
        </Card>
    )
};