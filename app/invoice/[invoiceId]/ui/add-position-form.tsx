'use client'
import { useFormStatus } from 'react-dom';
import { useRef, useState } from 'react';
import { addPosition } from '@/app/lib/actions/position';
import { Position } from '@prisma/client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../../components/ui/card';

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <button
            className={`mt-4 w-full px-4 py-2 text-sm font-medium text-white 
                bg-indigo-600 rounded-md hover:bg-indigo-500 
                dark:bg-indigo-500 dark:hover:bg-indigo-400
                ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            aria-disabled={pending}
            disabled={pending}
        >
            {pending ? 'Loading...' : 'Add position'}
        </button>
    )
}

const initialState: Position = {
    description: '',
    id: 0,
    quantity: 0,
    price: 0,
    tax: 0,
    total: 0,
    invoiceId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
};

type Props = {
    onCreated?: (position: Position) => void;
    invoiceId: string;
};

export default function AddPositionForm({ onCreated, invoiceId }: Props) {
    const [error, setError] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = async (formData: FormData) => {
        const description = formData.get('description') as string;
        const quantity = Number(formData.get('quantity'));
        const price = Number(formData.get('price'));
        const tax = Number(formData.get('tax')?.toString().replace('%', ''));
        const data = {
            ...initialState,
            description,
            quantity,
            price,
            tax,
            invoiceId: Number(invoiceId),
        };

        try {
            console.log(data);
            const res = await addPosition(data);
            if (res.status === 'error') {
                setError(res.message);
                return;
            }
            formRef.current?.reset();
            setError('');
            onCreated && onCreated(res.position);
        } catch (error: any) {
            setError(error.message);
        }
    }


    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Add Position</CardTitle>
            </CardHeader>
            <form action={onSubmit} ref={formRef}>
                <CardContent>
                    <div className='grid w-full items-center gap-4 md:grid-cols-2 lg:grid-cols-4'>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Input type="text" id="description" name='description' placeholder="Presentation" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input type="number" id="quantity" name="quantity" placeholder="1" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="price">Price</Label>
                            <Input type="number" id="price" name="price" placeholder="100" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="tax">Tax (in %)</Label>
                            <Input type="number" id="tax" name="tax" placeholder="19%" />
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}

                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit">Add Position</Button>
                </CardFooter>
            </form>
        </Card>
    );
}