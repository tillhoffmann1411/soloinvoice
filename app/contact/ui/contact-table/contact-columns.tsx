"use client"

import { Contact } from '@prisma/client';
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CopyIcon, OpenInNewWindowIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

export const contactColumns: ColumnDef<Contact>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const email = row.getValue("email") as string;
            return (
                <span className='flex items-center'>
                    <span>{email}</span>
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 ml-2"
                        onClick={() => navigator.clipboard.writeText(email)}
                    >
                        <CopyIcon className="h-4 w-4" />
                    </Button>
                </span>
            );
        }
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "street",
        header: "Address",
        cell: ({ row }) => {
            const contact = row.original as Contact;
            return `${contact.street}, ${contact.zipcode} ${contact.city}, ${contact.country}`;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt") as string;
            return new Date(createdAt).toLocaleString();
        },
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt") as string;
            return new Date(createdAt).toLocaleString();
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem><Pencil2Icon className='mr-1' />Edit contact</DropdownMenuItem>
                        <DropdownMenuItem><TrashIcon className='mr-1' />Delete contact</DropdownMenuItem>
                        <DropdownMenuItem><OpenInNewWindowIcon className='mr-1' />View contact</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];
