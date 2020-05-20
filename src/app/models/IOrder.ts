import IFood from './IFood';

export default interface IOrder {
  id: number;
  food: IFood;
  date: Date;
}
