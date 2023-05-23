import { Component } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foods:Food[] = [];
  constructor(private foodService:FoodService, private route:ActivatedRoute) { }

  async ngOnInit(): Promise<void>{
    
    this.route.params.subscribe(async params=>{
      if(params['searchTerm'])
      this.foods=await this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
        else if(params['tag'])
        this.foods=await this.foodService.getAllFoodsByTag(params['tag'])

        else 
        this.foods=await this.foodService.getAll();
    })
  }
}
