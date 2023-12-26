import Link from 'next/link';
import { ModeToggle } from './mode-toggle';


export function Header() {
    return (
        <header
            className='fixed z-50 flex items-center justify-between w-full h-16 px-6 border-b bg-card text-card-foreground shadow-sm'
        >
            <Link href="/">
                <p className="text-2xl font-bold">Invoice App</p>
            </Link>
            <div className="flex items-center space-x-4">
                <Link href="/contact">Contacts</Link>
                <Link href="/invoice">Invoices</Link>
                <ModeToggle />
            </div>
        </header>
    );
}