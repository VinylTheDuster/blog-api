export default function SideBar({ HandlingPage }) {

    const buttons = [
        { displayName: "Home", displayLogo: "home", page: "home" },
        { displayName: "Articles Editor", displayLogo: "articleseditor", page: "articles" },
        { displayName: "Tags Editor", displayLogo: "tagseditor", page: "tags" },
    ];

        return (
            <div className="bg-zinc-800 border-r border-zinc-500 shadow-lg">
                <div className="border-t border-zinc-500 mt-18 pt-10">
                    { buttons.map((item) => (
                        <button key={item.page} onClick={() => HandlingPage(item.page)} className="flex gap-5 py-2 pl-4 pr-8 w-full cursor-pointer transition-all hover:bg-zinc-500 active:bg-zinc-400">
                            <img src={`/icons/${item.displayLogo}.svg`} alt="" />
                            {item.displayName}
                        </button>
                    ))}
                </div>
            </div>
        )
}
