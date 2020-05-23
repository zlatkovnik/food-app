import { Component, OnInit, Input } from '@angular/core';

import IOrder from '../../models/IOrder';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input() order: IOrder;
  @Input() handleRemove: Function;

  constructor() {}

  ngOnInit(): void {}
}
