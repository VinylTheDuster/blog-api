export default function TagDelete({ abort, deleteTags }) {

    return (
        <div className="bg-zinc-700 text-zinc-100 font-ubuntu w-80">
            <span className="text-2xl">Tag Deletion</span>
            <p className="py-5 text-center">Are you sure you want to delete this/these tag(s)? This action cannot be undone.</p>
            <div className="flex justify-around">
                <button onClick={() => abort()} className="bg-zinc-400 px-6 py-2 text-xl text-zinc-700 rounded-md shadow-zinc-900 shadow-md hover:bg-zinc-500 hover:text-zinc-300 active:bg-zinc-600 active:text-zinc-100">Abort</button>
                <button onClick={() => { deleteTags(); abort(); }} className="bg-red-900 px-6 py-2 text-xl text-zinc-400 rounded-md shadow-zinc-900 shadow-md hover:bg-red-800 hover:text-zinc-300 active:bg-zinc-600 active:text-zinc-100">Delete</button>
            </div>
        </div>
    )
}
