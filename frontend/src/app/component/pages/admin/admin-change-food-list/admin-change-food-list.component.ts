import { Component } from '@angular/core';
import { FoodModel } from '../../../../shared/models/FoodForm_model';
import { FoodService } from '../../../../services/food/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-change-food-list',
  templateUrl: './admin-change-food-list.component.html',
  styleUrl: './admin-change-food-list.component.css'
})
export class AdminChangeFoodListComponent {
  foodList:FoodModel[] = []
  
  constructor(private foodService:FoodService,private router:Router){
    foodService.getAll().subscribe((foodList)=>{
      this.foodList = foodList
    })
  }

  onEdit(foodId: string) {
    this.router.navigateByUrl("/editFoodData/" + foodId);
  }

  onDelete(foodId: string) {
    this.router.navigateByUrl("/deleteFoodData/" + foodId)
  } 
}
