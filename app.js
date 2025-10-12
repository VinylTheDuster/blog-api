import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Dashboard
app.use("/dashboard", express.static(path.join(__dirname, "client/build")));

app.get("/dashboard/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
});

// Paths
const dataPath = path.join(__dirname, "data");
const articlesPath = path.join(dataPath, "articles.json");
const tagsPath = path.join(dataPath, "tags.json");
const versionPath = path.join(dataPath, "version.json");

const username = process.env.API_INTERFACE_USERNAME;
const password = process.env.API_INTERFACE_PASSWORD;
const secret = process.env.API_INTERFACE_FRUIT;

// Supabase init
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function init() {
    try {
        let { data: articles_list, errArticles } = await supabase
            .from("articles_list")
            .select("*");

        if (errArticles) throw errArticles;

        await fs.promises.writeFile(
            articlesPath,
            JSON.stringify(articles_list, null, 2)
        );

        let { data: articles_tags, errTags } = await supabase
            .from("articles_tags")
            .select("*");

        if (errTags) throw errTags;

        await fs.promises.writeFile(
            tagsPath,
            JSON.stringify(articles_tags, null, 2)
        );

        console.log("Updated from Supabase");
    } catch (err) {
        console.error("Erreur init:", err.message);
    }
}

// Routes
app.get("/", (req, res) => {
    res.send("API online.");
});

/// Get data from server to both clients
app.get("/data", (req, res) => {

    const { type } = req.query;
    let filePath;

    if (type === "articles") filePath = articlesPath;
    else if (type === "tags") filePath = tagsPath;
    else if (type === "version") filePath = versionPath;
    else return res.status(400).json({ error: "Invalid type" });

    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Reading error" });
        res.type("json").send(data);
    });
});

app.get("/api/data", (req, res) => {

    const { type, filter } = req.query;
    let filePath;

    if (type === "articles") filePath = articlesPath;
    else if (type === "tags") filePath = tagsPath;
    else if (type === "version") filePath = versionPath;
    else return res.status(400).json({ error: "Invalid type" });

    fs.readFile(filePath, "utf-8", (err, rawData) => {
        if (err) return res.status(500).json({ error: "Reading error" });

        let data;
        try {
            data = JSON.parse(rawData);
        } catch (e) {
            return res.status(500).json({ error: "Invalid JSON format" })
        }

        if (type === "articles" &&  Array.isArray(data)) {
            if (filter === "new") data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            else if (filter === "old") data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        }

        res.type("json").send(data);
    });
});

/// Auth
app.post("/login", (req, res) => {
    const { clientUsername, clientPassword, clientSecret } = req.body;

    if (
        clientUsername === username &&
        clientPassword === password &&  
        clientSecret === secret
    ) {
        res.json({
            success: true,
            message: "Access granted",
            redirectUrl: "/client/dashboard"
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }
});

// Launch after init
init().then(() => {
    app.listen(5500, () => console.log("API online on http://localhost:5500"));
}); 