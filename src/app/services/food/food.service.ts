import { Injectable } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';
import { fetchFoods } from 'src/app/app.module';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  
  constructor() { }

  async getFoodById(id:number):Promise<Food>{
    const foods=await this.getAll()
    return foods.find(food => food.id == id)!;
  }

  async getAllFoodsBySearchTerm(searchTerm:string):Promise<Food[]>{
    const foods= await this.getAll()
   return foods.filter(
      food => 
      food.name.toLowerCase().includes
      (searchTerm.toLowerCase()));

  }
  getAllTags():Tag[]{
    return [
     {name:'All',count:6 },
     {name:'FastFood',count:5 },
     {name:'Pizza',count:1 },
     {name:'Burger',count:1 },
     {name:'Chicken',count:2 },
     {name:'Fry',count:3 },
     {name:'SlowFood',count:1 },
    ];
  }

  getAllFoodsByTag(tag: string): Promise<Food[]> {
    return this.getAll().then(foods => {
      return tag === "All"
        ? foods
        : foods.filter(food => food.tags?.includes(tag));
    });
  }

   getAll():Promise<Food[]>{
    return fetchFoods()
  }

  
}
