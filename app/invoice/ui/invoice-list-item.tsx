import { Invoice } from '@prisma/client';
import { FileIcon, TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { deleteInvoice } from '../../lib/actions';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type Props = {
    invoice: Invoice;
    onDelete?: (id: number) => void;
};

export default function InvoiceListItem({ invoice, onDelete }: Props) {
    const router = useRouter();
    const onClick = () => {
        router.push(`/invoice/${invoice.id}`);
    };

    const onDeleteInvoice = async (e: any) => {
        e.stopPropagation();
        console.log('delete invoice', invoice.id);
        await deleteInvoice(invoice.id);
        onDelete && onDelete(invoice.id);
    }

    return (
        <li
            key={invoice.id}
            onClick={onClick}
            className="flex justify-between gap-x-6 rounded-lg p-2 cursor-pointer border border-transparent hover:border-inherit hover:shadow-sm"
        >
            <div className="flex min-w-0 gap-x-4">
                <div className="flex-none p-2">
                    <Avatar>
                        <AvatarFallback>
                            <FileIcon className="w-5 h-5 text-gray-500" />
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="min-w-0 flex-auto self-center">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{invoice.title}</p>
                </div>
            </div>
            <div className="self-center flex sm:flex-col sm:items-end">
                <Button onClick={onDeleteInvoice} variant="ghost" size="icon">
                    <TrashIcon className="w-5 h-5 text-red-600" />
                </Button>
            </div>
        </li >
    )
}