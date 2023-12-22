import { Invoice } from '@prisma/client';
import React, { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addInvoice } from '../../lib/actions';
import { useRouter } from 'next/navigation';

const initialState: Invoice = {
    id: 0,
    title: '',
    userId: 0,
};

type Props = {
    onCreate?: (invoice: Invoice) => void;
}

export default function AddInvoice({ onCreate }: Props) {
    const [error, setError] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

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
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit">Add Invoice</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
