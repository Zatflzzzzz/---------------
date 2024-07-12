import express from "express";
import cors from "cors";
import { food_array, sample_tags } from "./data";

const app = express();
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))

app.get("/api/foods",(req,res)=>{
     res.send(food_array);
})

app.get("/api/foods/search/:searchTerm", (req,res) => {
    const searchTerm = req.params.searchTerm;
    const foods = food_array.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))

    res.send(foods);
})

app.get("/api/foods/tags", (req,res) => {
    res.send(sample_tags);
})

app.get("/api/foods/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName
    const foods = tagName == "All" ? food_array : food_array.filter(food => food.tags?.includes(tagName))
    res.send(foods)
})

app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const foods = food_array.find(food => food.id == foodId);
    res.send(foods)
})

const port = 5000;
app.listen(port, ()=>{
     console.log("Website served on http://localhost:" + port)
})