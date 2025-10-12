export default function SideBar({ HandlingPage, currentPage }) {

    const buttons = [
        { displayName: "Home", displayLogo: "home", page: "home" },
        { displayName: "Articles Editor", displayLogo: "articleseditor", page: "articles" },
        { displayName: "Tags Editor", displayLogo: "tagseditor", page: "tags" },
    ];

        return (
            <div className="bg-zinc-800 border-r border-zinc-500 shadow-lg relative">
                <div className="border-t border-zinc-500 mt-18 pt-10 sticky">
                    { buttons.map((item) => (
                        <button key={item.page} onClick={() => HandlingPage(item.page)} className={`flex gap-5 py-2 pl-4 pr-8 w-full cursor-pointer transition-all hover:bg-zinc-500 active:bg-zinc-400 ${item.page === currentPage ? "bg-linear-to-r from-zinc-700 to-zinc-600 ring-r-2" : ""}`}>
                            <img src={`/icons/${item.displayLogo}.svg`} alt="" />
                            {item.displayName}
                        </button>
                    ))}
                </div>
            </div>
        )
}
