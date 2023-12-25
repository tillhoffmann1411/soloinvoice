import AddPositionForm from './ui/add-position-form'
import InvoiceTitle from './ui/invoice-title'

export default function Layout({
    children, params: { invoiceId }
}: {
    children: React.ReactNode
    params: { invoiceId: string }
}) {
    return (
        <div className="flex flex-col gap-y-8">
            <InvoiceTitle invoiceId={invoiceId} />
            <AddPositionForm invoiceId={invoiceId} />
            <div>
                {children}
            </div>
        </div>
    )
}
