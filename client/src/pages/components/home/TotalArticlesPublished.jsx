export default function TotalArticlesPublished({ length }) {
    return (
        <div className="flex gap-10 bg-zinc-500 rounded-2xl px-5 py-10 shadow-xl">
            <img src="/icons/publishedarticles.svg" width={100} alt="" />
            <div className="flex flex-col items-end justify-center">
                <span className="text-2xl">{length}</span>
                <span className="text-md">Published articles</span>
            </div>
        </div>
    )
}
