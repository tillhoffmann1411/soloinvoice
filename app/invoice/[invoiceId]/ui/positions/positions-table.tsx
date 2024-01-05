'use client';
import { useState, useEffect } from 'react';
import { getPositions } from '@/app/lib/actions/position';
import { positionColumns } from './position-columns';
import { DataTable } from '@/components/ui/data-table';
import { Position } from '@prisma/client';

type Props = {
    invoiceId: string;
};

export default function PositionTable({ invoiceId }: Props) {
    const [positions, setPositions] = useState<Position[]>([]);
    const columns = positionColumns;

    useEffect(() => {
        const fetchPositions = async () => {
            const positions = await getPositions(Number(invoiceId));
            setPositions(positions);
        };
        fetchPositions();
    }, [setPositions, invoiceId]);

    return (<DataTable columns={columns} data={positions} hiddenColumns={['id', 'createdAt', 'updatedAt']} />);
};
