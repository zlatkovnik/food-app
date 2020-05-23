import { Component, OnInit, Input } from '@angular/core';

import Food from '../../models/Food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  @Input() food: Food;

  constructor() {}

  ngOnInit(): void {}
}
