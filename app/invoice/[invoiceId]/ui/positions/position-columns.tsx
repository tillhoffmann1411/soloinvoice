"use client"

import { Position } from '@prisma/client';
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button"

import { TrashIcon } from '@radix-ui/react-icons';
import { deletePosition } from '../../../../lib/actions/position';

export const positionColumns: ColumnDef<Position>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "tax",
        header: "Tax",
    },
    {
        accessorKey: "total",
        header: "Total",
    },
    {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => {
            const deletePst = async () => {
                await deletePosition(position.id);
            }
            const position = row.original;
            return (
                <Button variant="ghost" onClick={deletePst}>
                    <TrashIcon className='text-red-600' />
                </Button>
            )
        }
    }
];
