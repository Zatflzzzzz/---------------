import { Injectable } from '@angular/core';
import { FoodModel } from '../../shared/models/FoodForm_model';
import { food_array, sample_tags } from '../../../data_food';
import { Tag } from '../../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  getAll():FoodModel[]{
    return food_array; 
  }

  getAllFoodBySearchTerm(searchTerm: string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllTags():Tag[]{
    return sample_tags;
  }

  getAllFoodByTag(tag:string):FoodModel[]{
    return tag == "All" ? this.getAll() : this.getAll().filter(food => food.tags?.includes(tag))
  }

  getFoodById(foodId:string):FoodModel{
      return this.getAll().find(food => food.id == foodId) ?? new FoodModel();
  }
}
