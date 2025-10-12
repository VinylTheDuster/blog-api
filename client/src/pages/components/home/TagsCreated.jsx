export default function TagsCreated({ tags }){
    return (
        <div className="flex gap-10 bg-zinc-500 rounded-2xl px-5 py-10 shadow-xl">
            <img src="/icons/tagseditor.svg" width={100} alt="" />
            <div className="flex flex-col items-end justify-center">
                <span className="text-2xl">{tags}</span>
                <span className="text-md">Tags created</span>
            </div>
        </div>
    )
}
