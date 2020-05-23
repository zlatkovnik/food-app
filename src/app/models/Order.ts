import Food from './Food';

export default interface Order {
  id: number;
  food: Food;
  date: Date;
}
