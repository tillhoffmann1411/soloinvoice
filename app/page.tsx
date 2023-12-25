import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-screen items-center justify-between p-24 pt-4">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="left-0 top-0 flex justify-center static w-auto rounded-xl border p-4">
          Solo Invoice
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://till-hoffmann.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with ❤️ by Till
          </a>
        </div>
      </div>

      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-auto">
        <h1 className="text-2xl">
          Free invoice generator for solopreneurs and freelancers
        </h1>
        <br />
        <p className="text-sm opacity-50">
          Create and send invoices in seconds
        </p>
        <br />
        <Link
          href="/invoice"
          className="px-4 py-2 z-50 text-sm font-medium cursor-pointer text-white bg-indigo-600 rounded-md"
        >
          Create Invoice
        </Link>
      </div>

      <div className="mb-32 lg:max-w-5xl lg:w-full lg:mb-0">

      </div>
    </div>
  )
}
