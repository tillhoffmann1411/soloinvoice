'use client';
import React, { useRef, useState } from 'react';
import { Contact } from '@prisma/client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { addContact } from '@/app/lib/actions/contact';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const initialState: Contact = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipcode: '',
    country: '',
    userId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
};

type Props = {
    onCreate?: (contact: Contact) => void;
}

export default function AddContact({ onCreate }: Props) {
    const [error, setError] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const onSubmit = async (formData: FormData) => {
        const name = formData.get('name')?.toString() || '';
        const email = formData.get('email')?.toString() || '';
        const telephone = formData.get('telephone')?.toString() || '';
        const street = formData.get('street')?.toString() || '';
        const city = formData.get('city')?.toString() || '';
        const postCode = formData.get('postCode')?.toString() || '';
        const country = formData.get('country')?.toString() || '';
        const userId = 1
        const data = {
            ...initialState,
            name,
            email,
            telephone,
            street,
            city,
            postCode,
            country,
            userId,
        };

        try {
            const res = await addContact(data);
            if (res.status === 'error') {
                setError(res.message);
                return;
            }
            formRef.current?.reset();
            onCreate && onCreate(res.contact);
            router.push(`/contact/${res.contact.id}`);
            setError('');
        } catch (error: any) {
            setError(error.message);
        }
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Contact</CardTitle>
                <CardDescription>Create a new contact as a recipient for invoices.</CardDescription>
            </CardHeader>
            <form action={onSubmit} ref={formRef}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Fancy Corp" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="info@fancycorp.com" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" placeholder="+1 123 456 789" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="street">Street</Label>
                            <Input id="street" name="street" placeholder="123 Main St" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" placeholder="New York" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="zipcode">Post code</Label>
                            <Input id="zipcode" name="zipcode" placeholder="12345" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" name="country" placeholder="USA" />
                        </div>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit">Create Contact</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
