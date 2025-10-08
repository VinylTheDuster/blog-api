import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Supabase intialization
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

app.get("/", (req, res) => {
    res.send("API online.");
});

app.get("/articles", (req, res) => {
    
});

app.post("/adminlogin", (req, res) => {
    const { username, password, fruit } = req.body;
});