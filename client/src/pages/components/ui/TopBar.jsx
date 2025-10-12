export default function TopBar() {
    return (
        <div className="flex items-center bg-zinc-800 py-5 pl-5 border-b border-zinc-500 shadow-lg">
            <span className="flex-1 font-ubuntu text-2xl">Administrator Panel</span> 
            <span className="flex-2">Ce dashboard est réservé à l'Administrateur.</span>   
        </div>
    )
}