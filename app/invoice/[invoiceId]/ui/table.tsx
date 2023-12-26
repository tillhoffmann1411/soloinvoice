import { Position } from '@prisma/client';
import { deletePosition } from '@/app/lib/actions/position';
import { TrashIcon } from '@radix-ui/react-icons';
import PositionTableSkeleton from './position-table-skeleton';
import { Skeleton } from '../../../../components/ui/skeleton';

type Props = {
    positions: Position[];
    onDelete?: (id: number) => void;
    loading: boolean;
};

export default function PositionTable({ positions, onDelete, loading }: Props) {
    const onDeletePosition = (id: number) => async () => {
        await deletePosition(id);
        onDelete && onDelete(id);
    }

    return (
        <div className="flex flex-col overflow-scroll">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 dark:bg-gray-900">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Description</th>
                                    <th scope="col" className="px-6 py-4">Quantity</th>
                                    <th scope="col" className="px-6 py-4">Price</th>
                                    <th scope="col" className="px-6 py-4">Tax</th>
                                    <th scope="col" className="px-6 py-4">Total</th>
                                    <th scope="col" className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && <PositionTableSkeleton />}
                                {positions.map((position, index) => (
                                    <tr key={position.description + position.total} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{position.description}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{position.quantity}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{position.price} €</td>
                                        <td className="whitespace-nowrap px-6 py-4">{position.tax} %</td>
                                        <td className="whitespace-nowrap px-6 py-4">{position.total} €</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <button className="text-red-600 hover:text-red-900" onClick={onDeletePosition(position.id)}>
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="border-t-4 font-bold dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4">Total</td>
                                    <td className="whitespace-nowrap px-6 py-4"></td>
                                    <td className="whitespace-nowrap px-6 py-4"></td>
                                    <td className="whitespace-nowrap px-6 py-4"></td>
                                    <td className="whitespace-nowrap px-6 py-4">{loading ? <Skeleton className="h-1 w-[25px]" /> : (positions.reduce((acc, curr) => acc + curr.total, 0).toFixed(2) + '€')}</td>
                                    <td className="whitespace-nowrap px-6 py-4"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
