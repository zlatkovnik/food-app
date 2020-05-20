import { Component, OnInit, Input } from '@angular/core';

import IFood from '../models/IFood';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  @Input() food: IFood;

  constructor() {}

  ngOnInit(): void {}
}
