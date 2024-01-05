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
    const mobileLayout = (
        <main className="w-full p-2">
            <div className="w-full">
                <h1 className="text-2xl font-bold pb-2">
                    Invoices
                </h1>
                <InvoiceSelector />
            </div>
            <div className="w-full">
                {children}
            </div>
        </main>
    );

    const desktopLayout = (
        <ResizablePanelGroup
            direction="horizontal"
        >
            <ResizablePanel defaultSize={25} minSize={20}>
                <div className="w-full pt-6 px-2">
                    <h1 className="text-2xl font-bold pb-2">
                        Invoices
                    </h1>
                    <InvoiceSelector />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75} minSize={30}>
                <div className="w-full p-6">
                    {children}
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
    return (
        <main className="flex">
            <div className="hidden w-full md:flex md:flex-col md:items-end">
                {desktopLayout}
            </div>
            <div className="w-full md:hidden">
                {mobileLayout}
            </div>
        </main>
    )
}
