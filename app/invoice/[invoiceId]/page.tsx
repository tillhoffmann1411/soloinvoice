'use client';
import AddPositionForm from './ui/add-position-form';
import GeneratePdf from './ui/generate-pdf';
import Table from './ui/table';
import { Invoice, Position } from '@prisma/client';
import { getInvoice, getPositions } from '../../lib/actions';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function Page({ params: { invoiceId } }: { params: { invoiceId: string } }) {
    const [positions, setPositions] = useState<Position[]>([]);
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadPositions = async () => {
            if (!invoiceId) {
                return;
            }
            const invPromise = getInvoice(Number(invoiceId));
            const pstPromise = getPositions(Number(invoiceId));
            const [inv, pst] = await Promise.all([invPromise, pstPromise]);
            setPositions(pst);
            setInvoice(inv);
        };
        loadPositions();
        setLoading(false);
    }, [setPositions, invoiceId, setLoading]);

    const onDeletePosition = (id: number) => {
        setPositions(positions.filter(position => position.id !== id));
    };

    const onCreated = (position: Position) => {
        setPositions([...positions, position]);
    };

    return (
        <main className="flex items-center flex-col gap-y-8 p-2 lg:flex-row lg:justify-around lg:items-start lg:gap-x-8 lg:p-6">
            <div className="w-full">
                <h1 className="text-2xl font-bold pb-2">
                    {loading ? <Skeleton className="h-4 w-[250px] my-2" /> : invoice?.title}
                </h1>
                <Separator className="my-4" />
                <h2 className='text-xl font-bold'>Positions</h2>
                <Table positions={positions} onDelete={onDeletePosition} loading={loading} />
                <div className='justify-end w-full flex'>
                    <GeneratePdf />
                </div>
            </div>
            <div className="w-full md:max-w-sm">
                <AddPositionForm invoiceId={Number(invoiceId)} onCreated={onCreated} />
            </div>
        </main>
    );
}
