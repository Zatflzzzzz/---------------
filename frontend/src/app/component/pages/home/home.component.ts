import { Component } from '@angular/core';
import { FoodModel } from '../../../shared/models/FoodForm_model';
import { FoodService } from '../../../services/food/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  foods:FoodModel[] = [];
  
  constructor(private foodService: FoodService, activatedRoute:ActivatedRoute){
    activatedRoute.params.subscribe((params)=>{
        if(params.searchTerm)
            this.foods = this.foodService.getAllFoodBySearchTerm(params.searchTerm);
        if(params.tag){
          this.foods = this.foodService.getAllFoodByTag(params.tag);
        }
        else{
            this.foods = this.foodService.getAll()
        }
    })
  }
}
