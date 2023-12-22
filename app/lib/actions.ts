'use server';
import { z } from 'zod';
import prisma from './db';
import { Invoice, Position } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const positionSchema = z.object({
    description: z.string().min(3),
    quantity: z.number().min(1),
    price: z.number().min(0),
    tax: z.number().min(0),
    invoiceId: z.number().min(0),
});

export async function addPosition(inPosition: Position): Promise<{ status: string, message: string, position: Position }> {
    const { description, quantity, price, tax, invoiceId } = inPosition;
    const result = positionSchema.safeParse({
        description,
        quantity,
        price,
        tax,
        invoiceId,
    })
    if (!result.success) {
        return { status: 'error', message: 'Invalid data', position: inPosition };
    }

    const total = Number((quantity * price * (1 + tax / 100)).toFixed(2));
    const data = { description, quantity, price, tax, total };
    try {
        const position = await prisma.position.create({
            data: {
                ...data,
                invoice: { connect: { id: invoiceId } }
            }
        });
        return { status: 'success', message: 'Position created', position };
    } catch (error: any) {
        console.error(error);
        return { status: 'error', message: error.message, position: inPosition };
    }
}

export async function getPositions(invoiceId: number): Promise<Position[]> {
    return prisma.position.findMany({ where: { invoiceId } });
}

export async function deletePosition(positionId: number): Promise<void> {
    await prisma.position.delete({ where: { id: positionId } });
    revalidatePath('/invoice');
}

const invoiceSchema = z.object({
    title: z.string().min(3),
    userId: z.number().min(1),
});

export async function addInvoice(inInvoice: Invoice): Promise<{ status: string, message: string, invoice: Invoice }> {
    const { title, userId } = inInvoice;
    const result = invoiceSchema.safeParse({
        title,
        userId,
    })
    if (!result.success) {
        return { status: 'error', message: 'Invalid data', invoice: inInvoice };
    }

    try {
        const invoice = await prisma.invoice.create({
            data: {
                user: { connect: { id: userId } },
                title,
            }
        });
        revalidatePath('/invoice');
        return { status: 'success', message: 'Ivoice created', invoice };
    } catch (error: any) {
        console.error(error);
        return { status: 'error', message: error.message, invoice: inInvoice };
    }
}

export async function getInvoices(): Promise<Invoice[]> {
    revalidatePath('/invoice');
    return prisma.invoice.findMany();
}

export async function getInvoice(invoiceId: number): Promise<Invoice | null> {
    return prisma.invoice.findUnique({ where: { id: invoiceId } });
}

export async function deleteInvoice(invoiceId: number): Promise<{ status: 'success' | 'error', message: string }> {
    console.log('deleteInvoice: ', invoiceId);
    try {
        await prisma.position.deleteMany({ where: { invoiceId } });
        await prisma.invoice.delete({ where: { id: invoiceId } });
        revalidatePath('/invoice');
        return { status: 'success', message: 'Invoice deleted' };
    } catch (error: any) {
        console.error(error);
        return { status: 'error', message: error.message };
    }
}