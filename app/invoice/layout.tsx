import InvoiceSelector from './ui/invoice-selector';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className=""
        >
            <ResizablePanel defaultSize={25}>
                <div className="w-full pt-6 px-2">
                    <h1 className="text-2xl font-bold pb-2">
                        Invoices
                    </h1>
                    <InvoiceSelector />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
                <div className="w-full p-6">
                    {children}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
