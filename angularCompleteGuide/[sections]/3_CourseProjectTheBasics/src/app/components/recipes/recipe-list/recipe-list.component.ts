import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://www.thespruceeats.com/thmb/ZHF8bSgBqiEty8pEV-bvwAaWQzM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetarian-pad-thai-3217746-10-10-5b0da1deeb97de003761334d.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://www.thespruceeats.com/thmb/ZHF8bSgBqiEty8pEV-bvwAaWQzM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetarian-pad-thai-3217746-10-10-5b0da1deeb97de003761334d.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
