'use client';
import GeneratePdf from './ui/generate-pdf';
import Table from './ui/table';
import { Position } from '@prisma/client';
import { getPositions } from '@/app/lib/actions/position';
import { useEffect, useState } from 'react';


export default function Page({ params: { invoiceId } }: { params: { invoiceId: string } }) {
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPositions = async () => {
            if (!invoiceId) {
                return;
            }
            const pst = await getPositions(Number(invoiceId));
            setPositions(pst);
        };
        loadPositions();
        setLoading(false);
    }, [setPositions, invoiceId, setLoading]);

    const onDeletePosition = (id: number) => {
        setPositions(positions.filter(position => position.id !== id));
    };

    return (
        <div>
            <h2 className='text-xl font-bold'>Positions</h2>
            <div className='w-full overflow-scroll'>
                <Table positions={positions} onDelete={onDeletePosition} loading={loading} />
            </div>
            <div className='justify-end w-full flex'>
                <GeneratePdf />
            </div>
        </div>
    );
}
