import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { Food, FoodModel } from '../models/food.model';
import { HTTP_BAD_REQUEST } from '../constants/http.status';
import { UserModel } from '../models/user.model';

const router = Router();


router.post("/addDish", asyncHandler(async (req:any,res) => {
    const {name, price, tags, favorite, stars, imageUrl, origins, cookTime} = req.body;

    const dish = await FoodModel.findOne({name});

    if(dish){
        res.status(HTTP_BAD_REQUEST).send('This dish is already on the menu');
        return;
    }

    const newDish: Food = {
        id:"",
        name,
        price,
        tags,
        favorite,
        stars,
        imageUrl,
        origins,
        cookTime,
    }

    const dbDish = await FoodModel.create(newDish);
    res.send();
}))

router.put("/editDataUser/:id", asyncHandler(async (req:any,res) => {
    const userId = req.params.id;
    const {updatedUser} = req.body

    const user = await UserModel.findByIdAndUpdate(userId, updatedUser, {new:true})

    if(!user){
        res.status(HTTP_BAD_REQUEST).send("Sorry, an unexpected error has occurred")
        return
    }

    res.send();
}))

router.put("/editFoodData/:id", asyncHandler(async (req:any,res) => {
    const foodId = req.params.id;
    const foodData = req.body

    if(!foodData){
        res.status(HTTP_BAD_REQUEST).send("Sorry, an unexpected error has occurred")
        return
    }

    const food = await FoodModel.findByIdAndUpdate(foodId, foodData)

    if(!food){
        res.status(HTTP_BAD_REQUEST).send("Sorry, an unexpected error has occurred")
        return
    }

    res.send();
}))

export default router;