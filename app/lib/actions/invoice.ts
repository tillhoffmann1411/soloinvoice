'use server';
import { z } from 'zod';
import prisma from '@/app/lib/db';
import { Invoice } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const invoiceSchema = z.object({
    title: z.string().min(3),
    userId: z.number().min(1),
});

export async function addInvoice(inInvoice: Invoice): Promise<{ status: string, message: string, invoice: Invoice }> {
    const { title, invoiceNo, date, dueDate, contactId, userId } = inInvoice;
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
                contact: { connect: { id: contactId } },
                title,
                invoiceNo,
                date,
                dueDate,
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
    return prisma.invoice.findMany({ where: { userId: 1 } });
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
