import { getContact } from '@/app/lib/actions/contact';

export default async function Page({ params: { contactId } }: { params: { contactId: string } }) {
    const contact = await getContact(Number(contactId));

    return (
        <div>
            <h2 className='text-xl font-bold'>Contact Details</h2>
            <div className='w-full overflow-scroll'>
                {contact?.name}
            </div>
            <div className='justify-end w-full flex'>
                {contact?.email}
            </div>
        </div>
    );
}
