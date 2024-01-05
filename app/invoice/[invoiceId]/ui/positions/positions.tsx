'use client';
import React from 'react'
import PositionTable from './positions-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
    invoiceId: string;
};

export default function Positions({ invoiceId }: Props) {
    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Positions</CardTitle>
            </CardHeader>
            <CardContent>
                <PositionTable invoiceId={invoiceId} />
            </CardContent>
        </Card>
    )
}
