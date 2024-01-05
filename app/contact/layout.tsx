'use server';
import ContactSelector from './ui/invoice-selector'

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className='p-6'>
            {children}
        </main>
    )
}
