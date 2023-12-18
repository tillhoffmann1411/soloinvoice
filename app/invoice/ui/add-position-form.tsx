'use client'
import { useFormState, useFormStatus } from 'react-dom';
import { Position } from '../../lib/definitions';
import Input from '../../ui/input';
import { addPosition } from '../../lib/actions';
import { useEffect, useRef } from 'react';

const initialState: Position = {
    description: '',
    quantity: 0,
    price: 0,
    tax: 0,
    total: 0,
};

type Props = {
    onCreate?: (position: Position) => void;
};

export default function AddPositionForm({ onCreate }: Props) {
    const [formState, formAction] = useFormState(addPosition, {
        status: '',
        message: '',
        errors: undefined,
        position: initialState,
    });
    const { pending } = useFormStatus();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formState.status === 'success') {
            onCreate?.(formState.position);
            formRef.current?.reset;
            formState.status = 'done';
        }
    }, [formState, onCreate]);

    return (
        <form action={formAction} ref={formRef} className="w-full md:w-1/2">
            <Input label="Description" name="description" />
            <Input label="Quantity" type="number" name="quantity" />
            <Input label="Price" name="price" type="number" step='.01' />
            <Input label="Tax" name="tax" type="number" />
            <Input label="Total" name="total" type="number" step='.01' hidden />
            {formState.status === 'error' && <p className="text-red-500">{formState.message}</p>}
            {formState.status === 'done' && <p className="text-green-500">{formState.message}</p>}
            <button
                className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-400"
                type="submit"
                aria-disabled={pending}
            >
                {pending ? 'Loading...' : 'Add position'}
            </button>
        </form>
    );
}