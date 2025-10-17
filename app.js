import express, { raw } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Middlewares import
import Auth from "./middlewares/auth.js"

// Env
dotenv.config();
const username = process.env.API_INTERFACE_USERNAME;
const password = process.env.API_INTERFACE_PASSWORD;
const secret = process.env.API_INTERFACE_FRUIT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use(cors());

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

const filesToWatch = [ articlesPath, tagsPath ]

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

// Watch every changes on the json files to update supabase
filesToWatch.forEach(filePath => {
    fs.watch(filePath, (eventType, filename) => {
        if (eventType === "change") {
            console.log(`${filename} has been modified!`);
            fs.readFile(filePath, "utf-8", async (err, data) => {
                if (err) return console.error("Read error:", err);
                try {
                    const json = JSON.parse(data);
                    console.log("Nouveau contenu:", json);

                    let tableName;

                    if (filePath === articlesPath) tableName = "articles_list"
                    else if (filePath === tagsPath) tableName = "articles_tags"

                    const { data: currentRows, error: selectError } = await supabase
                        .from(tableName)
                        .select("id");

                    if (selectError) throw selectError;

                    const idsInJson = json.map(item => item.id);
                    const idsInDb = currentRows.map(row => row.id);

                    const idsToDelete = idsInDb.filter(id => !idsInJson.includes(id));

                    if (idsToDelete.length > 0) {
                        const { error: deleteError } = await supabase
                            .from(tableName)
                            .delete()
                            .in("id", idsToDelete);
                        if (deleteError) throw deleteError;
                    }

                    const { error: upsertError } = await supabase
                        .from(tableName)
                        .upsert(json)
                        
                    if (upsertError) {
                        console.error("Supabase error during update:", upsertError);
                    } else {
                        console.log("Supabase table updated with success!")
                    }
                } catch (e) {
                    console.error("Invalid JSON:", err);
                }
            });
        }
    });
});

// Routes
app.get("/", (req, res) => {
    res.send("API online.");
});

/// Get data from server to both clients
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

/// Add data to local jsons
app.post("/api/insert", (req, res) => {
    const { type } = req.query;

    let filePath;
    if (type === "articles") filePath = articlesPath;
    else if (type === "tags") filePath = tagsPath;
    else return res.status(400).json({ error: "Invalid type" });

    fs.readFile(filePath, "utf-8", (err, rawData) => {
        if (err) return res.status(500).json({ error: "Reading error" })
        
        let data;
        try {
            data = JSON.parse(rawData);
        } catch (e) {
            return res.status(500).json({ error: "Invalid JSON format" })
        }

        const dataToInsert = req.body;

        if (!Array.isArray(dataToInsert)) {
            return res.status(400).json({ error: "Data must be an array!" });
        }

        data.push(...dataToInsert);

        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: "Writing error: Something went wrong!" });
            }
            res
                .status(200)
                .json({ success: true, inserted: dataToInsert.length });
        });
    });
});



/// Auth
app.post("/login", Auth, (req, res) => {
    res.json({
        redirectUrl: "/client/dashboard"
    });
});

// Launch after init
init().then(() => {
    app.listen(5500, () => console.log("API online on http://localhost:5500"));
}); 