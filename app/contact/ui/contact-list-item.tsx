'use client';
import { Contact } from '@prisma/client';
import { FileIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

type Props = {
    contact: Contact;
    onDelete?: (id: number) => void;
};

export default function ContactListItem({ contact, onDelete }: Props) {

    return (
        <Link href={`/contact/${contact.id}`}>
            <li
                key={contact.id}
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
                        <p className="text-sm font-semibold">{contact.name}</p>
                    </div>
                </div>
            </li >
        </Link>
    )
}