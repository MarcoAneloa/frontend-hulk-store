import { Category } from "./category.model";

export class Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description:string;
  img:string;
  bestseller:boolean;
  category: Category;
}
