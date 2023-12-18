'use client';
import { useEffect, useState } from 'react';
import { getPositions } from '../lib/actions';
import AddPositionForm from './ui/add-position-form';
import GeneratePdf from './ui/generate-pdf';
import Table from './ui/table';
import { Position } from '../lib/definitions';

export default function Page() {
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        const loadPositions = async () => {
            setPositions(await getPositions());
        }
        loadPositions();
    }, [setPositions]);

    const onCreate = async () => {
        setPositions(await getPositions());
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <AddPositionForm onCreate={onCreate} />
            <Table positions={positions} />
            <GeneratePdf />
        </main>
    );
}
