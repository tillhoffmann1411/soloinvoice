'use client';
import React, { useEffect, useState } from 'react'
import PositionTable from './positions-table';
import { Position } from '@prisma/client';
import { getPositions } from '@/app/lib/actions/position';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
    invoiceId: string;
};

export default function Positions({ invoiceId }: Props) {
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        const loadPositions = async () => {
            if (!invoiceId) {
                return;
            }
            const pst = await getPositions(Number(invoiceId));
            setPositions(pst);
        };
        loadPositions();
    }, [setPositions, invoiceId]);

    const onDeletePosition = (id: number) => {
        setPositions(positions.filter(position => position.id !== id));
    };

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Positions</CardTitle>
            </CardHeader>
            <CardContent>
                <PositionTable positions={positions} onDelete={onDeletePosition} />
            </CardContent>
        </Card>
    )
}
