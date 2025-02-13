export class Foods {
  _id!: any;
  price!: number;
  foodname!: string;
  favorite: boolean = false;
  star: number = 0;
  tags?: string[];
  category: any;
  foodimg!: string;
  foodtime!: string;
  origins!: string[];
}

export interface category {
  category: [],
  message: string;
}