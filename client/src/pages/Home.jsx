import TotalArticlesPublished from './components/home/TotalArticlesPublished'
import CurrMonthPublishedArticles from './components/home/CurrMonthPublishedArticles'
import TagsCreated from './components/home/TagsCreated'

export default function Home({ articles, tags }) {

    return (
        <div className="grid-cols-1">
            <div className="flex justify-center gap-6 flex-wrap mt-8">
                <TotalArticlesPublished length={articles.length} />
                <CurrMonthPublishedArticles article={articles} />
                <TagsCreated tags={tags.length} />
            </div>
        </div>
    )
}