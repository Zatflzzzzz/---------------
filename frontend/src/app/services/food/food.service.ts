import { Injectable } from '@angular/core';
import { FoodModel } from '../../shared/models/FoodForm_model';
import { food_array, sample_tags } from '../../../data_food';
import { Tag } from '../../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ADMIN_FOOD_ADD_TO_LIST_URL, ADMIN_FOOD_EDIT_DATA, FOOD_BY_ID_URL, FOOD_BY_SEARCH_URL, FOOD_TAGS_URL, FOOD_URL, FOODS_BY_TAG_URL } from '../../shared/constants/url';
import { IFood } from '../../shared/interfaces/IFood';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private http:HttpClient, private toastrService:ToastrService, userService:UserService){}
  getAll():Observable<FoodModel[]>{
    return this.http.get<FoodModel[]>(FOOD_URL);
  }

  getAllFoodBySearchTerm(searchTerm: string){
    return this.http.get<FoodModel[]>(FOOD_BY_SEARCH_URL + searchTerm);
  }

  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOOD_TAGS_URL);
  }

  getAllFoodByTag(tag:string):Observable<FoodModel[]>{
    return tag == "All" ? this.getAll() : this.http.get<FoodModel[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId:string):Observable<FoodModel>{
      return this.http.get<FoodModel>(FOOD_BY_ID_URL + foodId);
  }

  addFoodToList(foodModel:IFood):Observable<IFood>{
    return this.http.post<IFood>(ADMIN_FOOD_ADD_TO_LIST_URL, foodModel).pipe(tap({
      next:()=>{
        this.toastrService.success(
          'You have successfully added the dish to the site'
        )
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error, 'An error occurred when adding a dish to the site')
      }
    }))
  } 
  
  editFoodData(foodData:IFood, foodId: string){
    return this.http.put<FoodModel>(ADMIN_FOOD_EDIT_DATA + foodId, foodData).pipe(tap({
      next:()=>{
        this.toastrService.success(
          'You have successfully edit data of the dish'
        )
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error, 'An error occurred when edit dish data')
      }
    }))
  }
}
