import { Injectable } from '@angular/core';
import { FoodModel } from '../../shared/models/FoodForm_model';
import { food_array, sample_tags } from '../../../data_food';
import { Tag } from '../../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_BY_ID_URL, FOOD_BY_SEARCH_URL, FOOD_TAGS_URL, FOOD_URL, FOODS_BY_TAG_URL } from '../../shared/models/constants/url';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private http:HttpClient){

  }
  
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
}
