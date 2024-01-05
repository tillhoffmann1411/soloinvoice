'use client';
import AddPositionForm from './ui/add-position-form';
import Contact from './ui/contact-card/contact';
import GeneratePdf from './ui/generate-pdf';
import InvoiceTitle from './ui/invoice-title';
import Positions from './ui/positions/positions';


export default function Page({ params: { invoiceId } }: { params: { invoiceId: string } }) {
    return (
        <div className="space-y-4">
            <InvoiceTitle invoiceId={invoiceId} />
            <Contact invoiceId={invoiceId} />
            <Positions invoiceId={invoiceId} />
            <AddPositionForm invoiceId={invoiceId} />
            <GeneratePdf />
        </div>
    );
}
