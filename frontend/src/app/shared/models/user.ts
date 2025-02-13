export interface User {
  fullname: string;
  email: string;
  mobile: string;
  password: string;
  message: string;
  user: any;
  token: string;
}

export interface foodProduct {
  foodname: string;
  price: number;
  desc: string;
  foodtime: string;
  foodimg: string;
  category: string;

}

export interface allFoodProduct extends foodProduct {
  food: [];
  message: string;
}