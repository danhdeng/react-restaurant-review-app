import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app=express();

//apply middleware
app.use(cors());

//allow server to accept json
app.use(express.json());

app.use("/api/v1/restaurants", restaurants);

app.use("*", (req, res)=>
        res.status(404).json({error: "Not found"}));

export default app;
