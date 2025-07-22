interface TopbarProps {
    page: number;
    setPage: (it: any) => void;
    totalPage: number;
}
export default function Topbar({ page, setPage, totalPage }: TopbarProps) {
    return (
        <div>
            <h1 className="text-center font-semibold text-2xl p-4">Tirthesh Jain GrowMeOrganic Assignment</h1>
            <h2 className="text-center p-4">Current Page: {page}/{totalPage}</h2>
            <div className="sticky top-0 flex justify-between gap-2 m-3">
                <button
                    className="bg-gray-200 text-sm px-4 py-2 rounded-md hover:bg-gray-300"
                    onClick={() => setPage((prev: number) => (prev > 1) ? prev - 1 : 1)}
                    style={(page <= 1) ? { opacity: 0.5 } : {}}
                    disabled={(page <= 1)}
                >
                    ←&nbsp;Previous
                </button>
                <button
                    className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => setPage((prev: number) => (prev < totalPage) ? prev + 1 : totalPage)}
                    style={(page >= totalPage) ? { opacity: 0.5 } : {}}
                    disabled={(page >= totalPage)}
                >
                    Next&nbsp;→
                </button>
            </div>
        </div>
    )
}
