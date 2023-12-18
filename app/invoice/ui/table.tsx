import { Position } from '../../lib/definitions';

type Props = {
    positions: Position[];
};

export default function PositionTable({ positions }: Props) {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Description</th>
                                    <th scope="col" className="px-6 py-4">Quantity</th>
                                    <th scope="col" className="px-6 py-4">Price</th>
                                    <th scope="col" className="px-6 py-4">Tax</th>
                                    <th scope="col" className="px-6 py-4">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {positions.map((position, index) => (
                                    <tr key={position.description + position.total} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{position.description}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{position.quantity}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{position.price}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{position.tax}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{position.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
