'use server';
import { Contact } from '@prisma/client';
import prisma from '../db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const contactSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(8),
    street: z.string().min(3),
    city: z.string().min(3),
    country: z.string().min(3),
    zipcode: z.string().min(3),
});

export async function getContacts(): Promise<Contact[]> {
    const contacts = await prisma.contact.findMany({ where: { userId: 1 } });
    return contacts;
}

export async function getContact(contactId: number): Promise<Contact | null> {
    return prisma.contact.findUnique({ where: { id: contactId } });
};

export async function getContactForInvoice(invoiceId: number): Promise<Contact | null> {
    const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId }, include: { contact: true } });
    return invoice?.contact || null;
}

export async function addContact(inContact: Contact): Promise<{ status: string, message: string, contact: Contact }> {
    const { name, email, phone, street, city, country, zipcode, userId } = inContact;
    const result = contactSchema.safeParse({
        name,
        email,
        phone,
        street,
        city,
        country,
        zipcode,
        userId,
    })
    if (!result.success) {
        return { status: 'error', message: 'Invalid data', contact: inContact };
    }

    try {
        const contact = await prisma.contact.create({
            data: {
                user: { connect: { id: userId } },
                name,
                email,
                phone,
                street,
                city,
                country,
                zipcode,
            }
        });
        revalidatePath('/invoice');
        return { status: 'success', message: 'Contact created', contact };
    } catch (error: any) {
        console.error(error);
        return { status: 'error', message: error.message, contact: inContact };
    }
}