export default function Skeleton() {

    return (
        <div className="animate-pulse space-y-4">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded"></div>
            ))}
        </div>
    )
}
