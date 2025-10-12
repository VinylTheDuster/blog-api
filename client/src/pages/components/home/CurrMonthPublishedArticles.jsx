import { useState, useEffect } from "react"

export default function CurrMonthPublishedArticles({ article }) {

    const dateNow = new Date();
    const currentMonth = dateNow.getMonth();
    const currentYear = dateNow.getFullYear();

    const [length, setLength] = useState(0);

    useEffect(() => {
        setLength(article.filter(article => {
            const date = new Date(article.created_at);
            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );
        }).length);
    }, [article, currentMonth, currentYear]);

    return (
        <div className="flex gap-10 bg-zinc-500 rounded-2xl px-5 py-10 shadow-xl">
            <img src="/icons/monthlyarticles.svg" width={100} alt="" />
            <div className="flex flex-col items-end justify-center">
                <span className="text-2xl">{length}</span>
                <span className="text-md">Published this month</span>
            </div>
        </div>
    )
}
