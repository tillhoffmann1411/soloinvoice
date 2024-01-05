
export default function Layout({
    children, params: { contactId }
}: {
    children: React.ReactNode
    params: { contactId: string }
}) {
    return (
        <div className="flex flex-col gap-y-8">
            <h1>{contactId}</h1>
            <div>
                {children}
            </div>
        </div>
    )
}
