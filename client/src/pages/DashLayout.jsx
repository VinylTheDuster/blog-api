import SideBar from "./components/ui/SideBar"
import TopBar from "./components/ui/TopBar"

import Home from "./Home"
import TagsEditor from "./TagsEditor"

import { useState, useEffect } from "react"

export default function DashLayout() {

    const [currentPage, setCurrentPage] = useState("home");
    const [filter, setFilter] = useState("new");

    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch articles
    useEffect(() => {
        fetch(`${API_URL}/data?type=articles&filter=${filter}`)
            .then(res => res.json())
            .then(data => setArticles(data))
            .catch(err => console.error("API Articles Error:", err));
    }, [API_URL, filter])

    // Fetch tags
    useEffect(() => {
        fetch(`${API_URL}/data?type=tags`)
            .then(res => res.json())
            .then(data => setTags(data))
            .catch(err => console.error("API Tags Error", err));
    }, [API_URL])

    function deleteBackTags(tagsToDelete) {
        if(tagsToDelete && tagsToDelete.length > 0) {
            fetch(`${API_URL}/delete/data?type=tags`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tagsToDelete)
            })
            .then(res => res.json())
            .then(data => {
                console.log("Successful deletion:", data);
            })
            .catch(err => {
                console.error("Deletion error:", err);
            });
        }
    }

    const HandlingPage = (page) => setCurrentPage(page);

    console.log(tags);
    
    return (
        <div className="flex flex-row h-screen">
            <SideBar HandlingPage={HandlingPage} currentPage={currentPage} />
            <div className="flex flex-col grow">
                <TopBar />
                <main id="main">
                    { (currentPage === "home") && <Home articles={articles} tags={tags} /> }
                    { (currentPage === "tags") && <TagsEditor tags={tags} deleteTagObject={deleteBackTags} /> }
                </main>
            </div>
        </div>
    )
}