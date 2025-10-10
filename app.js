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

app.get("/dashboard/*", (req, res) => {
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
        let { data: articles_list, error } = await supabase
            .from("articles_list")
            .select("*");

        if (error) throw error;

        await fs.promises.writeFile(
            articlesPath,
            JSON.stringify(articles_list, null, 2)
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

/// Get data from server to client
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
    app.listen(3000, () => console.log("API online on http://localhost:3000"));
});