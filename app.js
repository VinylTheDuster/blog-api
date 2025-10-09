import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Supabase intialization
const supabase = createClient(
    process.env.local.SUPABASE_URL,
    process.env.local.SUPABASE_ANON_KEY
);

app.use('/bootstrap', express.static(path.join(process.cwd(), 'node_modules/bootstrap/dist')));

app.get("/", (req, res) => {
    res.send("API online.");
});

app.get("/articles", (req, res) => {
    
});

app.post("/adminlogin", (req, res) => {
    const { username, password, fruit } = req.body;
});