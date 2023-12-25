import InvoiceSelector from './ui/invoice-selector'

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex items-center flex-col gap-y-8 p-2 md:flex-row md:items-start md:gap-x-4">
            <div className="w-full md:w-1/4 md:max-w-sm">
                <h1 className="text-2xl font-bold pb-2">
                    Invoices
                </h1>
                <InvoiceSelector />
            </div>
            <div className="w-full">
                {children}
            </div>
        </main>
    )
}
