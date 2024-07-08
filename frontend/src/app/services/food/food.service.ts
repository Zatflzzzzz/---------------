import { Injectable } from '@angular/core';
import { FoodModel } from '../../shared/models/FoodForm_model';
import { food_array } from '../../../data_food';

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
}
