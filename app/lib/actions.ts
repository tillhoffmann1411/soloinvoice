'use server';

import { Position } from './definitions';
import { DEMO_POSITIONS } from './placeholder-data';
import { z } from 'zod'

let POSITIONS = DEMO_POSITIONS;

const schema = z.object({
    description: z.string().min(3),
    quantity: z.number().min(1),
    price: z.number().min(0),
    tax: z.number().min(0),
})

export async function addPosition(previousState: any, formData: any) {
    const description = formData.get('description');
    const quantity = Number(formData.get('quantity'));
    const price = Number(formData.get('price'));
    const tax = Number(formData.get('tax'));

    const result = schema.safeParse({
        description,
        quantity,
        price,
        tax,
    })
    if (!result.success) {
        const initPosition = { description, quantity, price, tax, total: 0 };
        return { status: 'error', message: 'Invalid data', errors: result.error.flatten(), position: initPosition };
    }

    const total = quantity * price * (1 + tax / 100);
    const position = { description, quantity, price, tax, total };
    POSITIONS = [...POSITIONS, position];
    return { status: 'success', message: 'Position created', position };
}

export async function getPositions(): Promise<Position[]> {
    return POSITIONS;
}