import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

export default function PositionTableSkeleton() {
    const nrOfRows = Array.from({ length: 5 }, (_, i) => i);
    return nrOfRows.map((row, index) => (
        <tr key={row} className="border-t-4 font-bold dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium"><Skeleton className="h-1 w-[150px]" /></td>
            <td className="whitespace-nowrap px-6 py-4"><Skeleton className="h-1 w-[25px]" /></td>
            <td className="whitespace-nowrap px-6 py-4"><Skeleton className="h-1 w-[25px]" /></td>
            <td className="whitespace-nowrap px-6 py-4"><Skeleton className="h-1 w-[25px]" /></td>
            <td className="whitespace-nowrap px-6 py-4"><Skeleton className="h-1 w-[25px]" /></td>
            <td className="whitespace-nowrap px-6 py-4"><Skeleton className="h-1 w-[25px]" /></td>
        </tr>
    ));
}
